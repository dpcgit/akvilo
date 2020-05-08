import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonFab, IonIcon, IonFabButton, IonPopover} from '@ionic/react';
import {addCircle, cafe, remove, removeCircle} from 'ionicons/icons'
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;


// Interface for state
interface State{
 target: number;
 input: number;
 consumed: number;
 increment: number;
 popoveropen: boolean;
};


// Function setting the target in storage
async function setTarget(value: string) {
 await Storage.set({key: 'target',  value: value});
};

// Function getting the target from storage
async function getTarget(){
 const a = await Storage.get({key:'target'});
 console.log(a);
}

class Tab1 extends React.Component<State> {
// State initialization
  state: State = {
	target:0,
	input:0,
	consumed:0,
	increment:200,
	popoveropen:false
  };


// Increment handler
  increment = () => {
    this.setState({consumed:this.state.consumed + this.state.increment});
  };

//Decrement handler
  decrement = () =>{
   this.setState({consumed:this.state.consumed - this.state.increment});
  };

// Hanlder for input change
  onChange = (e:any): void => {
   this.setState({input: parseInt(e.currentTarget.value)})
  }

// Handler for input change, increment setting
 onIncrementChange = (e:any): void=> {
  this.setState({increment: parseInt(e.currentTarget.value)})
 }

// Handler for set button
  onSubmit = (e:any): void => {
  this.setState({target: this.state.input})
  setTarget(String(this.state.input));
  }

// Handler for popover
 showPop = () =>{
  this.setState({popoveropen: !this.state.popoveropen})
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
	  <IonIcon icon={cafe} size="large" onClick={this.showPop}>
	  </IonIcon>
         </IonFabButton>

	 <IonFabButton>
	  <IonIcon icon={addCircle} size="large" onClick={this.increment}>
	  </IonIcon>
	 </IonFabButton>

	 <IonFabButton>
	 <IonIcon icon={removeCircle} size="large" onClick={this.decrement}>
	  </IonIcon>
	 </IonFabButton>
	</IonFab>

	Objetivo:
	<p>{this.state.target}</p>

	Progreso:
	<p>{this.state.consumed} / {this.state.target} ml </p>

	Incremento:
	<p>{this.state.increment}</p>

	<IonButton onClick={getTarget}> Ver storage
	 
	</IonButton>

	<IonPopover isOpen={this.state.popoveropen} onDidDismiss={this.showPop}>
	 <IonInput type="number" value={this.state.increment} onIonChange={this.onIncrementChange}>Incremento (ml):
	 </IonInput>
	</IonPopover>
	
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
