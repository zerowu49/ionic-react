import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { add } from 'ionicons/icons';
import {Toast} from '@capacitor/toast'
import {ActionPerformed, PushNotifications, PushNotificationSchema} from '@capacitor/push-notifications'

interface StudentModel{
  nim: string;
  nama: string;
  prodi: string;
  foto: string;
}

const PushNotif: React.FC = () => {
  const nullEntry : any[] = []
  const [notifications, setNotifications] = useState(nullEntry)

  const showToast = async(msg: string) => {
    await Toast.show({
      text: msg,
    })
  }

  useEffect(() => {
    PushNotifications.checkPermissions().then(res => {
      if(res.receive != 'granted'){
        PushNotifications.requestPermissions().then(res => {
          if(res.receive === 'denied'){
            showToast('Push notifications permission denied')
          }else{
            showToast('Push notifications permission granted')
            registerPush()
          }
        })
      }else{
        registerPush()
      }
    })
  }, [])

  const registerPush = () => {
    console.log("registering push")

    // Registering with Apple/Google to receive push via APNS/FCM
    PushNotifications.register()

    // On Success, we should be able to receive notification
    PushNotifications.addListener('registration',
    token => {
      showToast('Push registration success')
      console.info('Push registration success with token: ' + token)
    })

    // Some issue with our setup and push will not work 
    PushNotifications.addListener('registrationError',
    err => {
      showToast(`Error: ${JSON.stringify(err)}`)
      console.info('Push registration error: ' , JSON.stringify(err))
    })

    // Show us the notifications payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
    (notification: PushNotificationSchema) => {
      setNotifications(notifications => [...notifications, {
        id: notification.id, 
        title: notification.title,
        body: notification.body,
        type: 'foreground'
      }])
      console.log('notif foreground: ', notification)
      console.log('notifs: ', notifications)
    })

    PushNotifications.addListener('pushNotificationActionPerformed',
    (notification: ActionPerformed) => {
      setNotifications(notifications => [...notifications, {
        id: notification.notification.data.id, 
        title: notification.notification.data.title,
        body: notification.notification.data.body,
        type: 'action'
      }])
      console.log('notif action: ', notification)
      console.log('notifs: ', notifications)
    })
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Push Notifications</IonTitle>
          <IonButtons slot="end">
            <IonRouterLink routerLink="/add-student">
              <IonButton>
                <IonIcon slot="icon-only"  icon={add} />
              </IonButton>
            </IonRouterLink>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Instruction</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            1.Register for Push by clicking the footer button. <br/>
            2.Once Registered, you can send push from Firebase console. <br/>
            3. Once your app receives notifications, you'll see the data here in the list. <br/>
          </IonCardContent>
        </IonCard>
        <br/>
        <IonList>
          {notifications.map(notif => {
            return <IonItem key={notif.id}>
              <IonLabel>
                <h3>{notif.title}</h3>
                <p>{notif.body}</p>
                {notif.type === "foreground" && <p>This data was received in foreground</p>}
                {notif.type === "action" && <p>This data was received on tap</p>}
              </IonLabel>
            </IonItem>
          })}
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton color="success" expand="full" onClick={registerPush}>Register for Push</IonButton>
          {/* <IonButton color="success" expand="full" routerLink={'/login'}>Go to Login</IonButton> */}
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default PushNotif;
