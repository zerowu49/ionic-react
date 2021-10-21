import { isPlatform } from '@ionic/core';
import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { add } from 'ionicons/icons';

const GoodMemories: React.FC = () => {
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
