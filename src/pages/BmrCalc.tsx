import { IonAlert, IonApp, IonBackButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonListHeader, IonPage, IonRadio, IonRadioGroup, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useState, useRef, useEffect } from 'react';
import BmiControls from '../components/BmiControls';
import BmrResult from '../components/BmrResult';
import InputControl from '../components/InputControl';
import './Home.css';

const BmrCalc: React.FC = () => {
  const [error, setError] = useState<string>()
  const [calculatedBMR, setCalculatedBMR] = useState<number>()
  const [calcUnits, setCalcUnits] = useState<'cmkg' | 'ftlbs'>('cmkg')
  const [gender, setGender] = useState<'male' | 'female'>()
  const [calory, setCalory] = useState<string>()

  const heightInputRef = useRef<HTMLIonInputElement>(null)
  const weightInputRef = useRef<HTMLIonInputElement>(null)
  const ageInputRef = useRef<HTMLIonInputElement>(null)

  useEffect(() => {
    let enteredWeight = weightInputRef.current!.value as number
    let enteredHeight = heightInputRef.current!.value as number

    // If data available then do calculation
    if (enteredWeight && enteredHeight && +enteredHeight >= 0 && +enteredWeight >= 0) {
      console.log("useffect")
      calculateBMR()
    }
  }, [calcUnits])

  const clearError = () => {
    setError("")
  }

  const calculateBMR = () => {
    let enteredWeight = weightInputRef.current!.value as number
    let enteredHeight = heightInputRef.current!.value as number
    let enteredAge = ageInputRef.current!.value as number

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

    // let bmr = +enteredWeight / ((+enteredHeight / 100) * (+enteredHeight / 100))
    let bmr
    console.log(enteredAge)
    if(gender == 'male'){
      bmr = 66 + (13.7 * +enteredWeight) + (5 * +enteredHeight) - (6.8 * enteredAge)
    }else{
      bmr = 65 + (9.6 * +enteredWeight) + (1.8 * +enteredHeight) - (4.7 * enteredAge)
    }
    bmr = bmr.toFixed(2) as unknown as number

    setCalculatedBMR(bmr)
  }

  const resetInputs = () => {
    weightInputRef.current!.value = ''
    heightInputRef.current!.value = ''
    setCalculatedBMR(0)
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
            <IonTitle>BMR Calculator</IonTitle>
            <IonButtons slot="start">
              <IonBackButton defaultHref='/home'/>
            </IonButtons>
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
                    Age
                  </IonLabel>
                  <IonInput ref={ageInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRadioGroup value={gender} onIonChange={(e => setGender(e.detail.value))}>
              <IonListHeader>
                <IonLabel>Gender</IonLabel>
              </IonListHeader>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel>Male</IonLabel>
                    <IonRadio slot="start" value="male" />
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem>
                    <IonLabel>Female</IonLabel>
                    <IonRadio slot="start" value="female" />
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonRadioGroup>
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
            <BmiControls onCalculate={calculateBMR} onReset={resetInputs} />
            <BmrResult calculatedBMR={calculatedBMR} />
          </IonGrid>
        </IonContent>
      </IonApp>
    </IonPage>
  )
};

export default BmrCalc;
