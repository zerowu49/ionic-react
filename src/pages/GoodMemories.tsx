import { isPlatform } from '@ionic/core';
import { IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, location } from 'ionicons/icons';
import { useContext } from 'react';
import MemoryItem from '../components/MemoryItem';
import MemoriesContext from '../data/memories-context';

const GoodMemories: React.FC = () => {
  const memoriesCtx = useContext(MemoriesContext)
  const goodMemories = memoriesCtx.memories.filter(memory => memory.type === 'good')
  
  let layout
  if(goodMemories.length === 0){
    layout = (
      <IonRow>
        <IonCol className="ion-text-center">
          <h2>No good memories found.</h2>
        </IonCol>
      </IonRow>
    )
  }else{
    layout = goodMemories.map(memory => {
      return <MemoryItem memory={memory}/>
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Good Memories</IonTitle>
          <IonButtons slot="end">
            <IonRouterLink routerLink="/location">
              <IonButton>
                <IonIcon slot="icon-only"  icon={location} />
              </IonButton>
            </IonRouterLink>
            {isPlatform("ios") && 
              <IonRouterLink routerLink="/new">
                <IonButton>
                  <IonIcon slot="icon-only"  icon={add} />
                </IonButton>
              </IonRouterLink>
            }
          </IonButtons>
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

export default GoodMemories;
