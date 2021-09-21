import { IonApp, IonRouterOutlet } from '@ionic/react';
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
import Mail from './pages/Mail';
import Meet from './pages/Meet';

const App: React.FC = () => {
  console.info("masuk app")
  return (
    <IonApp>
      <IonReactRouter>
          <IonRouterOutlet>
            <Route path='/tabs' component={MailTabs}/>
            <Route path='/mail/:mailId' component={MailDetail}/>
            <Redirect exact from='/' to='/tabs'/>
          </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;