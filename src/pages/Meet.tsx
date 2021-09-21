import { IonContent, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { ban } from 'ionicons/icons';
import { useRef } from 'react';

export const FRIENDS_DATA = [
  {id: 'f1', name: 'Adi'},
  {id: 'f2', name: 'Budi'},
  {id: 'f3', name: 'Cici'}
]

const Meet: React.FC = () => {
  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null)

  const callFriendHandler = () => {
    console.log("Calling...")
  }
  
  const blockFriendHandler = (event: React.MouseEvent) => {
    slidingOptionsRef.current?.closeOpened()
    console.log("Blocking...")
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Meet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class='ion-padding'>
        <IonList>
        {FRIENDS_DATA.map(friend => (
          <IonItemSliding key={friend.id} ref={slidingOptionsRef}>
            <IonItemOptions side="start">
              <IonItemOption color="danger" onClick={blockFriendHandler}>
                <IonIcon slot="icon-only" icon={ban}/>
              </IonItemOption>
            </IonItemOptions>
            <IonItem lines="full" button onClick={callFriendHandler}>
              <IonLabel>{friend.name}</IonLabel>
            </IonItem>
          </IonItemSliding>
        ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Meet;
