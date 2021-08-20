import { IonAlert, IonApp, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar } from '@ionic/react';
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
  const [error, setError] = useState<string>()
  const [calcUnits, setCalcUnits] = useState<'cmkg'|'ftlbs'>('cmkg')  

  const heightInputRef = useRef<HTMLIonInputElement>(null)
  const weightInputRef = useRef<HTMLIonInputElement>(null)

  const changeErrorHandler = (message: string) => {
    setError(message)
  }

  const selectCalcUnitHandler = (selectedValue: 'cmkg'| 'ftlbs') => {
    console.log("changed", selectedValue)
    setCalcUnits(selectedValue)
  }

  return (
    <>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[
          {text: 'Okay', handler: () => changeErrorHandler("")}
        ]}/>
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
                <InputControl selectedValue={calcUnits} onSelectedValue={selectCalcUnitHandler}/>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Tinggi Badan ({calcUnits === 'cmkg' ? 'cm' : 'feet'})
                  </IonLabel>
                  <IonInput ref={heightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Berat Badan ({calcUnits === 'cmkg' ? 'kg' : 'lbs'})
                  </IonLabel>
                  <IonInput ref={weightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            {/* <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />
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
              )} */}
              <BmiResult 
                selectedValue={calcUnits} 
                weightInputRef={weightInputRef}
                heightInputRef={heightInputRef}
                onError={changeErrorHandler}
                />
          </IonGrid>
        </IonContent>
      </IonApp>
    </>
  )};

export default App;
