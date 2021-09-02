import { IonAlert, IonApp, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useRef, useState } from 'react'
import BmiControls from './components/BmiControls'

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
  const [calculatedBMI, setCalculatedBMI] = useState<number>()
  const [statusBMI, setStatusBMI] = useState<string>("")
  const [calcUnits, setCalcUnits] = useState<'cmkg' | 'ftlbs'>('cmkg')

  const heightInputRef = useRef<HTMLIonInputElement>(null)
  const weightInputRef = useRef<HTMLIonInputElement>(null)

  const clearError = () => {
    setError("")
  }

  const calculateBMI = () => {
    let enteredWeight = weightInputRef.current!.value as number
    let enteredHeight = heightInputRef.current!.value as number

    if (!enteredWeight || !enteredHeight || +enteredHeight <= 0 || +enteredWeight <= 0) {
      setError('Please enter a valid (non-negative) input number')
      return
    }

    /// BMI Calculation
    if (calcUnits == 'ftlbs') {
      enteredWeight = enteredWeight / 2.2
      enteredHeight = enteredHeight / 0.0328
    }

    console.log(enteredWeight)
    console.log(enteredHeight)

    const bmi = +enteredWeight / ((+enteredHeight / 100) * (+enteredHeight / 100))
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

  const selectCalcUnitHandler = (selectedValue: 'cmkg' | 'ftlbs') => {
    console.log("changed", selectedValue)
    setCalcUnits(selectedValue)
  }

  return (
    <>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[
          { text: 'Okay', handler: clearError }
        ]} />
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
                <InputControl selectedValue={calcUnits} onSelectedValue={selectCalcUnitHandler} />
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
            <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />
            <BmiResult calculatedBMI={calculatedBMI} statusBMI={statusBMI} />
          </IonGrid>
        </IonContent>
      </IonApp>
    </>
  )
};

export default App;