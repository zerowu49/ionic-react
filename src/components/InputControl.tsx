import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import React from 'react'


const InputControl: React.FC<{selectedValue: 'cmkg' | 'ftlbs'}> = props => {
  return (
    <IonSegment value={props.selectedValue}>
      <IonSegmentButton value="cmkg">
        <IonLabel>cm/kg</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="ftlbs">
        <IonLabel>ft/lbs</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default InputControl;
