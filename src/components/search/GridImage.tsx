import { IonCardTitle } from '@ionic/react';
import './GridImage.css';

const GridImage: React.FC<{
  imgSrc: string,
  name: string,
}> = props => {
  return (
    <>
      <img src={props.imgSrc} height="100%" />
      <IonCardTitle id="name">{props.name}</IonCardTitle>
    </>
  );
};

export default GridImage;
