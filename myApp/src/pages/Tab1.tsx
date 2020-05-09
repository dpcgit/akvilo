import React, {useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonFab, IonIcon, IonFabButton, IonPopover} from '@ionic/react';
import {addCircle, cafe, remove, removeCircle} from 'ionicons/icons'
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;

// Function getting the target from storage
async function getTarget(){
 const a = await Storage.get({key:'target'});
 console.log(a.value)
 return a.value;
}


const Tab1:  React.FC = () =>  {

 const [target,setTarget] = useState(2000);
 const [increment,setIncrement] = useState(200);
 const [popover,setPopover] = useState(false);
 const [consumed, setConsumed] = useState(0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Consumo de agua</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

	<IonFab vertical="bottom" horizontal="end">

	 <IonFabButton>
	  <IonIcon icon={cafe} size="large" onClick={()=>setPopover(!popover)}>
	  </IonIcon>
         </IonFabButton>

	 <IonFabButton>
	  <IonIcon icon={addCircle} size="large" onClick={()=>setConsumed(consumed+increment)}>
	  </IonIcon>
	 </IonFabButton>

	 <IonFabButton>
	 <IonIcon icon={removeCircle} size="large" onClick={()=>setConsumed(consumed-increment)}>
	  </IonIcon>
	 </IonFabButton>
	</IonFab>

	<IonPopover isOpen={popover} onDidDismiss={()=>setPopover(false)}>
	 <IonInput type="number" value={increment}>Incremento (ml):
	 </IonInput>
	</IonPopover>

	<p>Objectivo: {target}</p>
	<p>Progreso: {consumed} / {target} ml </p>	
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
