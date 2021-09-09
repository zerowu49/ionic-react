import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class='ion-padding'>
        <h2>This works!</h2>        
        <IonButton expand='block' routerLink="/bmi">BMI Calculator</IonButton>
        <IonButton expand='block' routerLink="/bmr">BMR Calculator</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
