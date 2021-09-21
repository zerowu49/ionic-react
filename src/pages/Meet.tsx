import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

export const MAIL_DATA = [
  {id: 'm1', subject: 'Magang MBKM dimulai'},
  {id: 'm2', subject: 'Bimbingan Skripsi'},
  {id: 'm3', subject: 'Progress Laporan'}
]

const Meet: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Meet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class='ion-padding'>
        This is Meet
      </IonContent>
    </IonPage>
  );
};

export default Meet;
