import React, {useState, useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonFab, IonIcon, IonFabButton, IonPopover} from '@ionic/react';
import {addCircle, cafe, removeCircle} from 'ionicons/icons'
import './Tab1.css';
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;


async function updateDates(fun:any){
  // Helper functions 
  ////////////////////////////////////////
 //CHecks if two dates are the same,that is, same year, day and month
 function is_same_date(date1: Date,date2: Date){
	return date1.getDate() === date2.getDate() && date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
 }
 
 //returns number of days between two different dates
 function days_between(date1: Date, date2: Date){

	const time1 = date1.getTime();
	const time2 =  date2.getTime();
	return Math.abs(time1-time2)/(1000*3600*24)
 }
 
 //gets the value from storage 
 async function getValue(key:string){
  const a = await Storage.get({key:key});
  return a.value;
 };
 

 // sets the value in storage
 async function setValue(key_string:string,value_string: string){
  await Storage.set({key:key_string,value:value_string});
  console.log("setValue", key_string,":", value_string)
 };

 // removes value from storage
 async function removeValue(key_string:string){
    await Storage.remove({key:key_string});
    console.log("Removed key:", key_string)
 }

 function getDatesArray(json_string:any){
  const object = JSON.parse(String(json_string));
  return object.dates;
 }
 /////////////////////////////////////////////////////
    
 const dates = await getValue("dates");
//// await removeValue("dates");

 if(dates===undefined || dates === null){
  console.log("Variable dates is not set in storage, setting value to current date JSON object, setting state to current date")    
  await setValue("dates",JSON.stringify({dates:[String(new Date())]}));
  fun([String(new Date())]);
  //
 }
 else{
  console.log("Variable dates is set in storage.");  
  console.log("Value for dates in storage:", dates);
    
 // await removeValue("dates");
  const current_date = new Date();
  const dates_object = JSON.parse(dates);
  const dates_string_array = dates_object.dates;
  const dates_array = dates_string_array.map((d:any)=>{return new Date(d)});
  const last_date_in_storage = dates_array[dates_array.length-1];
  
  console.log("Last day in storage:",last_date_in_storage);
  
  const updated_dates_array = is_same_date(current_date,last_date_in_storage)? dates_array :[...dates_array,current_date];
  const updated_dates_string_array = updated_dates_array.map((d:any)=>String(d));

  if(updated_dates_array===dates_array){
   console.log("Dates in storage are current, nothing to do");
  }
  else{
   console.log("Dates in storage are outdated, updating them and updating state");
   await setValue("dates", JSON.stringify({dates:updated_dates_string_array}));
   fun(updated_dates_string_array);
  
  //console.log("Updated dates:",updated_dates)
  //fun(updated_dates);
  }
}
}



const Tab1:  React.FC = () =>  {
 //State initialization
 const [target,setTarget] = useState(2000);
 const [increment,setIncrement] = useState(200);
 const [popover,setPopover] = useState(false);
 const [consumed, setConsumed] = useState(0);
 const [dates, setDates] = useState([String(new Date())])

 
 useEffect(()=>{
  updateDates(setDates)
  },
  []
 );

//
 const onChange = (e:any):void => {
  setIncrement(parseInt(e.currentTarget.value));
 }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Consumo de agua</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

	<IonFab vertical="bottom" horizontal="end">

	 <IonFabButton onClick={()=>setPopover(!popover)}>
	  <IonIcon icon={cafe} size="large">
	  </IonIcon>
         </IonFabButton>

	 <IonFabButton onClick={()=>setConsumed(consumed+increment)}>
	  <IonIcon icon={addCircle} size="large">
	  </IonIcon>
	 </IonFabButton>

	 <IonFabButton onClick={()=>setConsumed(consumed-increment)}>
	 <IonIcon icon={removeCircle} size="large">
	  </IonIcon>
	 </IonFabButton>
	</IonFab>

	<IonPopover isOpen={popover} onDidDismiss={()=>setPopover(false)}>
	 <IonInput type="number" value={increment} onIonChange={onChange}>Incremento (ml):
	 </IonInput>
	</IonPopover>

	<p>Objectivo: {target}</p>
	<p>Progreso: {consumed} / {target} ml </p>	
	<p>Dates: {dates.toString()}</p>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
