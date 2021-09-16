import { IonChip, IonIcon, IonLabel } from '@ionic/react';
import {  restaurantOutline, ticketOutline, bedOutline} from 'ionicons/icons';
import './Chips.css';


const Chips: React.FC = props => {
  return (
    <>
      <IonChip>
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
    </>
  );
};

export default Chips;
