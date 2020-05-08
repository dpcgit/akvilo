//Import useState also in order to use hooks, import storage plugin too
import React, {useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput } from '@ionic/react';
import './Tab3.css';
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;


// Function getting the target from storage
async function getTarget(){
 const a = await Storage.get({key:'target'});
 console.log(a.value)
 return a.value;
}


const Tab3: React.FC = () => {

 const [target, setTarget] = useState(2000);

async function initState() {
 const initTarget = await getTarget();
 const init_target = parseInt(String(initTarget));
 setTarget(init_target);
}

// Change state to value in storage
initState()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

	<IonInput type="number">
	</IonInput>

	<IonButton onClick={getTarget}> Check for state
	</IonButton>
	
	<p>{target}, {typeof(target)}</p>

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
