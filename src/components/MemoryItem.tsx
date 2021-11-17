import { IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import LocationItem from "./LocationItem";

const MemoryItem: React.FC<{memory: any}> = props => {
  const { id,title,type, fotoUrl, latitude, longitude } = props.memory

  const containerStyle = {
    width: '100%',
    height: '10rem',
  }

  const selectPos = (e: google.maps.MapMouseEvent) => {
    console.log("selected")
  }


  return (
    <IonRow key={id}>
      <IonCol>
        <IonCard>
          <img src={fotoUrl} alt={title}/>
          <LocationItem lat={latitude} lng={longitude} selectPos={selectPos} containerStyle={containerStyle}/>
          <IonCardHeader color={type === 'bad' ? 'danger' : 'success'}>
            <IonCardTitle className="ion-text-center">{title}</IonCardTitle>
          </IonCardHeader>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default MemoryItem;