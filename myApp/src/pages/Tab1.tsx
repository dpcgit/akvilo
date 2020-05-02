import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonText, IonButton, IonFab, IonIcon, IonFabButton} from '@ionic/react';
import {addCircle} from 'ionicons/icons'
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';


interface State{
 target: number;
};

class Tab1 extends React.Component<State> {
  state: State = {
	target:1000
};
  render(){
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Consumo de agua</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

	<IonInput type="number" placeholder="Ejemplo, 2000 ml" max="5000" min="0">
	Ingresa la cantidad de agua a tomar
	</IonInput>

	<IonButton>Fijar
	</IonButton>

	<IonFab vertical="bottom" horizontal="end">
	 <IonFabButton>
	  <IonIcon icon={addCircle} size="large">
	  </IonIcon>
	 </IonFabButton>
	</IonFab>
	<p>{this.state.target}</p>
	
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
 }
};

export default Tab1;
