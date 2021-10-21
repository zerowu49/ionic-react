import { isPlatform } from '@ionic/core';
import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useContext } from 'react';
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
      return (<IonRow key={memory.id}>
        <IonCol>
          <IonCard>
            <img src={memory.base64Url} alt={memory.title}/>
            <IonCardHeader>
              <IonCardTitle>{memory.title}</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </IonCol>
      </IonRow>)
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Good Memories</IonTitle>
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
        <h2>Good Memories</h2>
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
