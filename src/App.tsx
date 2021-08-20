import { IonApp, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import {useRef, useState} from 'react'

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
import InputControl from './components/InputControl';
import BmiResult from './components/BmiResult';

const App: React.FC = () => {
  const [calculatedBMI, setCalculatedBMI] = useState<number>()
  const [statusBMI, setStatusBMI] = useState<String>("")  

  const heightInputRef = useRef<HTMLIonInputElement>(null)
  const weightInputRef = useRef<HTMLIonInputElement>(null)

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value
    const enteredHeight = heightInputRef.current!.value

    if(!enteredWeight || !enteredHeight) return

    const bmi = +enteredWeight / ((+enteredHeight/100)*(+enteredHeight/100) )
    // console.log(bmi)
    setCalculatedBMI(bmi)

    if (bmi <= 8.5) {
      setStatusBMI("Kurus")
    } else if (bmi > 8.5 && bmi <= 24.9) {
      setStatusBMI("Normal");
    } else if (bmi > 24.9 && bmi <= 29.9) {
      setStatusBMI("Gemuk");
    } else {
      setStatusBMI("Obesitas");
    }
  }

  const resetInputs = () => {
    weightInputRef.current!.value = ''
    heightInputRef.current!.value = ''
    setCalculatedBMI(0)
  }

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonGrid className='ion-text-center'>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">
                  Tinggi Badan (cm)
                </IonLabel>
                <IonInput ref={heightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">
                  Berat Badan (kg)
                </IonLabel>
                <IonInput ref={weightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />
            {calculatedBMI && statusBMI && (
              <IonRow>
                <IonCol>
                  <IonCard>
                    <IonCardContent className='ion-text-center'>
                      <h3>{calculatedBMI}</h3>
                      <h1>{statusBMI}</h1>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            )}
        </IonGrid>
      </IonContent>
    </IonApp>
  )};

export default App;
