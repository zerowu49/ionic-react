import { IonCard, IonButton, IonImg, IonGrid, IonRow, IonCol } from '@ionic/react';
import './ImageReview.css'

interface ImageProps {
  imgSrc: string;
  text: string;
}

const ImageReview: React.FC<ImageProps> = ({ imgSrc, text }) => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol id="imageContainer" sizeMd="8" offsetMd="2">
          <IonCard>
            <IonImg src={imgSrc} />
            <IonButton id="buttonCenter" fill="outline" shape="round">
              {text}
            </IonButton>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ImageReview;
