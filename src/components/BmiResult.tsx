import { IonCard, IonCardContent, IonCol, IonRow } from '@ionic/react';
import React, { RefObject, useState } from 'react'
import BmiControls from './BmiControls';


const BmiResult: React.FC<{
    selectedValue: 'cmkg' | 'ftlbs';
    weightInputRef: RefObject<HTMLIonInputElement>;
    heightInputRef: RefObject<HTMLIonInputElement>;
    onError: (message: string) => void;
  }> = props => {

  const [calculatedBMI, setCalculatedBMI] = useState<number>()
  const [statusBMI, setStatusBMI] = useState<string>("")

  const calculateBMI = () => {
    const enteredWeight = props.weightInputRef.current!.value
    const enteredHeight = props.heightInputRef.current!.value

    if(!enteredWeight || !enteredHeight || +enteredHeight<= 0 || +enteredWeight <= 0 ) {
      props.onError('Please enter a valid (non-negative) input number')
      return 
    }

    /// Penghitungan BMI
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
    props.weightInputRef.current!.value = ''
    props.heightInputRef.current!.value = ''
    setCalculatedBMI(0)
  }

  return (
    <>
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
    </>
  );
};

export default BmiResult;
