import { IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar, isPlatform } from '@ionic/react';
import { base64FromPath } from '@ionic/react-hooks/filesystem';
import { add } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import MemoryItem from '../components/MemoryItem';
import { Memory } from '../data/memories-context';

const BadMemories: React.FC = () => {
  const url = "http://localhost/memories/good.php"
  const [bad, setBad] = useState<Array<Memory>>([])

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(response => response.memories)
      .then((memories : Array<Memory>) => {
        memories.map(async mem => mem.base64Url = await base64FromPath(mem.imagePath));
        setBad(memories)
      })
  }, [])
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
