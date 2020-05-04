import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonText, IonButton, IonFab, IonIcon, IonFabButton} from '@ionic/react';
import {addCircle} from 'ionicons/icons'
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

// Interface for state
interface State{
 target: number;
 input: number;
};

class Tab1 extends React.Component<State> {
// State initialization
  state: State = {
	target:0,
	input:0
  };


//Increment handler
  increment = () => {
    this.setState({target:this.state.target + 100});
  };

// Hanlder for input change
  onChange = (e:any): void => {
   this.setState({input: parseInt(e.currentTarget.value)})
  }

// Handler for set button
  onSubmit = (e:any): void => {
  this.setState({target: this.state.input})
  }


  render(){
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Consumo de agua</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

	<IonInput type="number" placeholder="Ejemplo, 2000 ml" max="5000" min="0" onIonChange={this.onChange}>
	Ingresa la cantidad de agua a tomar (ml):
	</IonInput>

	<IonButton type="submit" onClick={this.onSubmit}>Fijar
	</IonButton>

	<IonFab vertical="bottom" horizontal="end">
	 <IonFabButton>
	  <IonIcon icon={addCircle} size="large" onClick={this.increment}>
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
