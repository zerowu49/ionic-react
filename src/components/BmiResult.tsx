import { IonCard, IonCardContent, IonCol, IonRow } from '@ionic/react';
import React  from 'react'
import './BmiResult.css'

const BmiResult: React.FC<{
    calculatedBMI: number | undefined;
    statusBMI: string | undefined;
  }> = props => {
  const bmi = props.calculatedBMI
  const status = props.statusBMI

  return (
    <>
      {bmi && status && (
        <IonRow>
          <IonCol>
            <IonCard id="result">
              <IonCardContent className='ion-text-center'>
                <h2>{bmi}</h2>
                <h1>{status}</h1>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      )}
    </>
  );
};

export default BmiResult;
