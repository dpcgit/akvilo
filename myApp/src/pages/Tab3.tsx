//Import useState also in order to use hooks, import storage plugin too
import React, {useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput } from '@ionic/react';
import './Tab3.css';

//Import of storage plugin
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;


// Function getting the target from storage
async function getTarget(){
 const a = await Storage.get({key:'target'});
 console.log(a.value)
 return a.value;
}


// Function setting the target in storage
async function setTarget(value: string) {
 await Storage.set({key: 'target',  value: value});
};


// Function to execute when target input changes:
const onChange = (e:any): void => {
  setTarget(e.currentTarget.value);
}


//Tab component definition
const Tab3: React.FC = () => {

// Hook for state
 const [target, setTarget] = useState(2000);

// Definition of function that changes state
async function initState() {
 const initTarget = await getTarget();
 const init_target = parseInt(String(initTarget));
 setTarget(init_target);
}

// Change state to value in storage
initState()

//TSX below
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Configuracion</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

	<IonInput type="number" value={target} onIonChange={onChange}>Ingresa cantidad diaria de agua a tomar (ml):
	</IonInput>


      </IonContent>
    </IonPage>
  );
};

export default Tab3;
