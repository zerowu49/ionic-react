import { IonChip, IonIcon, IonLabel } from '@ionic/react';
import {  restaurantOutline, ticketOutline, bedOutline} from 'ionicons/icons';
import './Chips.css';


const Chips: React.FC = props => {
  return (
    <>
      <IonChip>
        <IonIcon icon={bedOutline} color="primary" />
        <IonLabel>Hotels</IonLabel>
      </IonChip>
      <IonChip>
        <IonIcon icon={ticketOutline} color="primary" />
        <IonLabel>Things to Do</IonLabel>
      </IonChip>
      <IonChip>
        <IonIcon icon={restaurantOutline} color="primary" />
        <IonLabel>Restaurant</IonLabel>
      </IonChip>
    </>
  );
};

export default Chips;
