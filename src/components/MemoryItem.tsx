import { IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import { Memory } from "../data/memories-context";
import LocationItem from "./LocationItem";

const MemoryItem: React.FC<{memory: Memory}> = props => {
  const { memory } = props

  const containerStyle = {
    width: '100%',
    height: '5rem',
  }

  const selectPos = (e: google.maps.MapMouseEvent) => {
    console.log("selected")
  }

  return (
    <IonRow key={memory.id}>
      <IonCol>
        <IonCard>
          <img src={memory.base64Url} alt={memory.title}/>
          <LocationItem lat={memory.lat} lng={memory.lng} selectPos={selectPos} containerStyle={containerStyle}/>
          <IonCardHeader>
            <IonCardTitle>{memory.title}</IonCardTitle>
          </IonCardHeader>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default MemoryItem;
