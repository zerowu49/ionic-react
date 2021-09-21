import { IonAvatar, IonContent, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { ban, create, trashBin, trashOutline } from 'ionicons/icons';
import { useRef } from 'react';

export const FRIENDS_DATA = [
  {id: 'f1', name: 'Adi', img: "https://pict-b.sindonews.net/dyn/620/pena/news/2021/08/23/185/519138/ini-penyebab-lord-adi-gagal-melaju-ke-grand-final-masterchef-indonesia-iuo.jpg"},
  {id: 'f2', name: 'Budi', img: "https://cdn.idntimes.com/content-images/post/20191120/budi-setiawan2-9ffe3777769a3b4e15bdd28057f8d0f7.JPG"},
  {id: 'f3', name: 'Cici', img: "https://cdn1-production-images-kly.akamaized.net/m_kqza7cnlqMN00PRAw-ICwm9X0=/640x640/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/991899/original/063975500_1442472613-Cici_Paramida-9.jpg"}
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

  const deleteFriendHandler = (event: React.MouseEvent) => {
    slidingOptionsRef.current?.closeOpened()
    console.log("Deleting...")
  }

  const editFriendHandler = (event: React.MouseEvent) => {
    slidingOptionsRef.current?.closeOpened()
    console.log("Editing...")
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
              <IonItemOption color="warning" onClick={deleteFriendHandler}>
                <IonIcon slot="icon-only" icon={trashOutline}/>
              </IonItemOption>
            </IonItemOptions>
            <IonItemOptions side="end">
              <IonItemOption color="warning" onClick={editFriendHandler}>
                <IonIcon slot="icon-only" icon={create}/>
              </IonItemOption>
            </IonItemOptions>
            <IonItem lines="full" button onClick={callFriendHandler}>
              <IonAvatar slot="start">
                <img src={friend.img}/>
              </IonAvatar>
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
