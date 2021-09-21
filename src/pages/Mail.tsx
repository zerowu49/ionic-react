import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

export const MAIL_DATA = [
  {id: 'm1', subject: 'Magang MBKM dimulai'},
  {id: 'm2', subject: 'Bimbingan Skripsi'},
  {id: 'm3', subject: 'Progress Laporan'}
]

const Mail: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class='ion-padding'>
        {MAIL_DATA.map(mail => (
          <IonCard key={mail.id}>
            <IonCardContent className="ion-text-center">
              <h2>{mail.subject}</h2>
              <IonButton routerLink={`/mail/${mail.id}`}>
                View Mail
              </IonButton>
            </IonCardContent>
          </IonCard>
        ))}        
      </IonContent>
    </IonPage>
  );
};

export default Mail;
