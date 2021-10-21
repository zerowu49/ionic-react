import { IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import { Memory } from "../data/memories-context";

const MemoryItem: React.FC<{memory: Memory}> = props => {
  const { memory } = props
  return (
    <IonRow key={memory.id}>
      <IonCol>
        <IonCard>
          <img src={memory.base64Url} alt={memory.title}/>
          <IonCardHeader>
            <IonCardTitle>{memory.title}</IonCardTitle>
          </IonCardHeader>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default MemoryItem;
