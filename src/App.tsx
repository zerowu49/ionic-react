import { IonApp, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { Redirect, Route } from 'react-router';
import MailDetail from './pages/MailDetail';
import MailTabs from './pages/MailTabs';
import { list, settings, warning } from 'ionicons/icons';
import Settings from './pages/Settings';
import FriendsContextProvider from './data/FriendsContextProvider';

const App: React.FC = () => {
  console.info("masuk app")
  return (
    <IonApp>
      <IonReactRouter>
          <IonMenu contentId="main">
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonMenuButton/>
                </IonButtons>
                <IonTitle>Ion Mail</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
                <IonMenuToggle>
                  <IonItem button routerLink="/tabs/mail">
                    <IonIcon slot="start" icon={list}/>
                    <IonLabel>All Mail</IonLabel>
                  </IonItem>
                </IonMenuToggle>
                <IonMenuToggle>
                  <IonItem button routerLink="/tabs/spam">
                    <IonIcon slot="start" icon={warning}/>
                    <IonLabel>Spam</IonLabel>
                  </IonItem>
                </IonMenuToggle>
                <IonMenuToggle>
                  <IonItem button routerLink="/settings">
                    <IonIcon slot="start" icon={settings}/>
                    <IonLabel>Settings</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              </IonList>
            </IonContent>
          </IonMenu>
          <FriendsContextProvider>
            <IonRouterOutlet id="main">
              <Route exact path='/settings' component={Settings}/>
              <Route path='/tabs' component={MailTabs}/>
              <Route path='/mail/:mailId' component={MailDetail}/>
              <Redirect exact from='/' to='/tabs'/>
            </IonRouterOutlet>
          </FriendsContextProvider>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;