import { IonCard, IonCardContent, IonCol, IonRow } from '@ionic/react';
import React  from 'react'
import './BmiResult.css'

const BmiResult: React.FC<{
    calculatedBMI: number | undefined;
    statusBMI: 'Kurus' | 'Normal' | 'Gemuk' | 'Obesitas';
  }> = props => {
  const bmi = props.calculatedBMI
  const status = props.statusBMI

  let statusClass
  if(props.statusBMI == 'Normal'){
    statusClass = 'success'
  }else if(props.statusBMI == 'Obesitas'){
    statusClass = 'danger'
  }else{
    statusClass = 'warning'
  }

  return (
    <>
      {bmi && status && (
        <IonRow>
          <IonCol>
            <IonCard id="result" color={statusClass}>
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
