import { IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar, isPlatform } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useContext } from 'react';
import MemoryItem from '../components/MemoryItem';
import MemoriesContext from '../data/memories-context';

const BadMemories: React.FC = () => {
  const memoriesCtx = useContext(MemoriesContext)
  const badMemories = memoriesCtx.memories.filter(memory => memory.type === 'bad')
  
  let layout
  if(badMemories.length === 0){
    layout = (
      <IonRow>
        <IonCol className="ion-text-center">
          <h2>No bad memories found.</h2>
        </IonCol>
      </IonRow>
    )
  }else{
    layout = badMemories.map(memory => {
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
