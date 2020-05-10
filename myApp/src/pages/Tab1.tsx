import React, {useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonFab, IonIcon, IonFabButton, IonPopover} from '@ionic/react';
import {addCircle, cafe, remove, removeCircle} from 'ionicons/icons'
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;

// Function getting the value for a given key from storage, and then applying an optional function
async function getValueAndApply(key:string, func?: any){
 const a = await Storage.get({key:key});
 func==null?console.log("No function applied"):func(a.value);
 console.log(a.value)
 return a.value;
}


const Tab1:  React.FC = () =>  {

 const [target,setTarget] = useState(2000);
 const [increment,setIncrement] = useState(200);
 const [popover,setPopover] = useState(false);
 const [consumed, setConsumed] = useState(0);

 getValueAndApply("target",setTarget);

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
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
