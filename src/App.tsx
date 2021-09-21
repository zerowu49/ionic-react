import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { mailOutline, videocamOutline } from 'ionicons/icons'


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
import Mail from './pages/Mail';
import MailDetail from './pages/MailDetail';
import Meet from './pages/Meet';

const App: React.FC = () => {
  return (
      <IonApp>
        <IonReactRouter>
          <IonTabs>  
            <IonRouterOutlet>
              <Route exact path='/mail' component={Mail}/>
              <Route exact path='/meet' component={Meet}/>
              <Route path='/mail/:mailId' component={MailDetail}/>
              <Redirect exact from='/' to='/mail'/>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="mail" href="/mail">
                <IonIcon icon={mailOutline}/>
                <IonLabel>Mail</IonLabel>
              </IonTabButton>
              <IonTabButton tab="meet" href="/meet">
                <IonIcon icon={videocamOutline}/>
                <IonLabel>Meet</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
  )
};

export default App;