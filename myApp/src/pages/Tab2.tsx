import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar , IonSegment, IonSegmentButton} from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
       <IonSegment>
	<IonSegmentButton>Semana</IonSegmentButton>
	<IonSegmentButton>Mes</IonSegmentButton>
	<IonSegmentButton>Año</IonSegmentButton>	
       </IonSegment>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
