import { IonCard, IonCardContent, IonCol, IonGrid, IonRow } from '@ionic/react';
import React  from 'react'

const BmrResult: React.FC<{
    calculatedBMR: number | undefined;
  }> = props => {
  const bmr = props.calculatedBMR

  return (
    <>
      {bmr && (
        <IonRow>
          <IonCol>
            <IonCard>
              <IonCardContent>
                <div className='ion-text-center'>
                  <h1>BMR = {bmr} Calories/day</h1>
                  <br />
                  <h2>Daily calorie needs based on activity level</h2>
                </div>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <b>Activity Level</b>
                    </IonCol>
                    <IonCol className='ion-text-right'>
                      <b>Calorie</b>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      Sedentary: little or no exercise:
                    </IonCol>
                    <IonCol className='ion-text-right'>
                      {bmr*1.2}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      Exercise 1-3 times/week:
                    </IonCol>
                    <IonCol className='ion-text-right'>
                      {bmr*1.375}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      Exercise 4-5 times/week:
                    </IonCol>
                    <IonCol className='ion-text-right'>
                      {bmr*1.55}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      Intense exercise 6-7 times/week:
                    </IonCol>
                    <IonCol className='ion-text-right'>
                      {bmr*1.725}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      Daily exercise or intense exercise 3-4 times/week:
                    </IonCol>
                    <IonCol className='ion-text-right'>
                      {bmr*1.9}
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      )}
    </>
  );
};

export default BmrResult;
