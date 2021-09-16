import { IonCard, IonButton, IonImg } from '@ionic/react';
import './ImageReview.css'

interface ImageProps {
  imgSrc: string;
  text: string;
}

const ImageReview: React.FC<ImageProps> = ({ imgSrc, text }) => {
  return (
    <div id="imageContainer">
      <IonCard>
        <IonImg src={imgSrc} />
        <IonButton id="buttonCenter" fill="outline" shape="round">
          {text}
        </IonButton>
      </IonCard>
    </div>
  );
};

export default ImageReview;
