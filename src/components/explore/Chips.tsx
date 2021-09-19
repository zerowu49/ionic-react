import { IonChip, IonCol, IonIcon, IonLabel } from '@ionic/react';
import {  restaurantOutline, ticketOutline, bedOutline, chatbubblesOutline} from 'ionicons/icons';
import './Chips.css';


const Chips: React.FC = () => {
  return (
    <IonCol id="carousel">
      <IonChip color="light">
        <IonIcon icon={bedOutline}/>
        <IonLabel>Hotels</IonLabel>
      </IonChip>
      <IonChip color="light">
        <IonIcon icon={ticketOutline} />
        <IonLabel>Things to Do</IonLabel>
      </IonChip>
      <IonChip color="light">
        <IonIcon icon={restaurantOutline} />
        <IonLabel>Restaurant</IonLabel>
      </IonChip>
      <IonChip color="light">
        <IonIcon icon={chatbubblesOutline} />
        <IonLabel>Forum</IonLabel>
      </IonChip>
    </IonCol>
  );
};

export default Chips;
