import { IonAlert, IonApp, IonBackButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useState, useRef, useEffect } from 'react';
import BmiControls from '../components/BmiControls';
import BmiResult from '../components/BmiResult';
import InputControl from '../components/InputControl';
import './Home.css';

const BmiCalc: React.FC = () => {
  const [error, setError] = useState<string>()
  const [calculatedBMI, setCalculatedBMI] = useState<number>()
  const [statusBMI, setStatusBMI] = useState<'Kurus' | 'Normal' | 'Gemuk' | 'Obesitas'>('Kurus')
  const [calcUnits, setCalcUnits] = useState<'cmkg' | 'ftlbs'>('cmkg')

  const heightInputRef = useRef<HTMLIonInputElement>(null)
  const weightInputRef = useRef<HTMLIonInputElement>(null)

  useEffect(() => {
    let enteredWeight = weightInputRef.current!.value as number
    let enteredHeight = heightInputRef.current!.value as number

    // If data available then do calculation
    if (enteredWeight && enteredHeight && +enteredHeight >= 0 && +enteredWeight >= 0) {
      console.log("useffect")
      calculateBMI()
    }
  }, [calcUnits])

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

    let bmi = +enteredWeight / ((+enteredHeight / 100) * (+enteredHeight / 100))
    bmi = bmi.toFixed(2) as unknown as number

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
    <IonPage>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[
          { text: 'Okay', handler: clearError }
        ]} />
      <IonApp>
        <IonHeader>
          <IonToolbar color='primary'>
            <IonTitle >BMI Calculator</IonTitle>
            <IonButtons slot="start">
              <IonBackButton defaultHref='/home'/>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
          <IonGrid>
            <IonRow>
              <IonCol sizeSm='8' offsetSm="2" sizeMd='6' offsetMd='3'>
                <IonGrid className='ion-no-padding'>
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
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonApp>
    </IonPage>
  )
};

export default BmiCalc;
