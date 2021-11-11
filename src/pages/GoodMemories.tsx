import { isPlatform } from '@ionic/core';
import { IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { base64FromPath } from '@ionic/react-hooks/filesystem';
import { add, people } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import MemoryItem from '../components/MemoryItem';
import { Memory } from '../data/memories-context';

const GoodMemories: React.FC = () => {
  const [good, setGood] = useState<Array<Memory>>([])
  
  let layout
  if(good.length === 0){
    layout = (
      <IonRow>
        <IonCol className="ion-text-center">
          <h2>No good memories found.</h2>
        </IonCol>
      </IonRow>
    )
  }else{
    layout = good.map(memory => {
      return <MemoryItem memory={memory}/>
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Good Memories</IonTitle>
          <IonButtons slot="end">
            <IonRouterLink routerLink="/student">
              <IonButton>
                <IonIcon slot="icon-only"  icon={people} />
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
