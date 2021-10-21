import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar, isPlatform } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useContext } from 'react';
import ExploreContainer from '../components/ExploreContainer';
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
        <h2>Bad Memories</h2>
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
