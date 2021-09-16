import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/react';
import { atCircle, ellipseOutline, heartCircleOutline, heartOutline } from 'ionicons/icons';
import './ImageWithLove.css';


const ImageWithLove: React.FC<{
  imgSrc: string,
  price: string,
  name: string,
}> = props => {
  return (
    <IonCard>
      <IonIcon id="love" icon={heartCircleOutline} size="large" />
      <img src={props.imgSrc} />
      <IonCardHeader>
        <IonCardSubtitle>{props.price}</IonCardSubtitle>
        <IonCardTitle>{props.name}</IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default ImageWithLove;
