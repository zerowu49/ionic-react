import { IonChip, IonCol, IonIcon, IonLabel } from '@ionic/react';
import {  restaurantOutline, ticketOutline, bedOutline, chatbubblesOutline} from 'ionicons/icons';
import './Chips.css';


const Chips: React.FC = () => {
  return (
    <IonCol id="carousel">
      <IonChip >
        <IonIcon icon={bedOutline}/>
        <IonLabel>Hotels</IonLabel>
      </IonChip>
      <IonChip>
        <IonIcon icon={ticketOutline} />
        <IonLabel>Things to Do</IonLabel>
      </IonChip>
      <IonChip>
        <IonIcon icon={restaurantOutline} />
        <IonLabel>Restaurant</IonLabel>
      </IonChip>
      <IonChip>
        <IonIcon icon={chatbubblesOutline} />
        <IonLabel>Forum</IonLabel>
      </IonChip>
    </IonCol>
  );
};

export default Chips;
