import { IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar, isPlatform } from '@ionic/react';
import { base64FromPath } from '@ionic/react-hooks/filesystem';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { add } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import MemoryItem from '../components/MemoryItem';
import { Memory } from '../data/memories-context';

const BadMemories: React.FC = () => {
  const db = getFirestore()
  const [bad, setBad] = useState<Array<any>>([])

  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db,"memories"))

      querySnapshot.forEach(doc => {
        console.log(doc.data())
        // Check whether the type is bad
        if(doc.data().type==="bad"){
          setBad(before => {
            return before.concat({...doc.data(),id: doc.id})
          })
        }
      })
    }
    getData()
  },[])
  
  let layout
  if(bad.length === 0){
    layout = (
      <IonRow>
        <IonCol className="ion-text-center">
          <h2>No bad memories found.</h2>
        </IonCol>
      </IonRow>
    )
  }else{
    layout = bad.map(memory => {
      return <MemoryItem memory={memory}/>
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Bad Memories</IonTitle>
          {isPlatform("ios") && <IonButtons slot="end">
            <IonRouterLink routerLink="/new">
              <IonButton>
                <IonIcon slot="icon-only"  icon={add} />
              </IonButton>
            </IonRouterLink>
          </IonButtons>}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          {layout}
        </IonGrid>  
        {isPlatform("android") && <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonRouterLink routerLink="/new">
            <IonFabButton>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonRouterLink>
        </IonFab>}
      </IonContent>
    </IonPage>
  );
};

export default BadMemories;
