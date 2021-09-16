import { IonCard, IonCardTitle } from '@ionic/react';


const GridImage: React.FC<{
  imgSrc: string,
  name: string,
}> = props => {
  return (
    <IonCard>
      <img src={props.imgSrc} height="100%" />
      <IonCardTitle>{props.name}</IonCardTitle>
    </IonCard>
  );
};

export default GridImage;
