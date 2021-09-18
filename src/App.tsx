import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { homeOutline, searchOutline, heartOutline, pencilOutline } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';

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

const App: React.FC = () => {
  const explore = "explore"
  const search = "search"
  const plan = "plan"
  const review = "review"

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path={explore}>
              <Tab1 />
            </Route>
            <Route exact path={search}>
              <Tab2 />
            </Route>
            <Route path={plan}>
              <Tab3 />
            </Route>
            <Route path={review}>
              <Tab4 />
            </Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href={explore}>
              <IonIcon icon={homeOutline} />
              <IonLabel>Explore</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href={explore}>
              <IonIcon icon={searchOutline} />
              <IonLabel>Search</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href={plan}>
              <IonIcon icon={heartOutline} />
              <IonLabel>Plan</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab4" href={review}>
              <IonIcon icon={pencilOutline} />
              <IonLabel>Review</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
