import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {happy, sad} from 'ionicons/icons'

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
import GoodMemories from './pages/GoodMemories';
import BadMemories from './pages/BadMemories';
import NewMemories from './pages/NewMemories';
import { useContext, useEffect } from 'react';
import MemoriesContext from './data/memories-context';
import Student from './pages/Student';

const App: React.FC = () => {
  const memoriesCtx = useContext(MemoriesContext)
  const {initContext} = memoriesCtx
  
  useEffect(() => {
    initContext()
  },[initContext])

  return (<IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/">
            <Redirect to="/good" />
          </Route>
          <Route exact path="/student">
            <Student />
          </Route>
          <Route exact path="/good">
            <GoodMemories />
          </Route>
          <Route exact path="/bad">
            <BadMemories />
          </Route>
          <Route exact path="/new">
            <NewMemories />
          </Route>
        </IonRouterOutlet>
        <IonTabBar  color="primary" slot="bottom">
          <IonTabButton tab="happy" href="/good">
            <IonIcon icon={happy}  />
            <IonLabel>Good Memories</IonLabel>
          </IonTabButton>
          <IonTabButton tab="sad" href="/bad">
            <IonIcon icon={sad}  />
            <IonLabel>Bad Memories</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>)
};

export default App;
