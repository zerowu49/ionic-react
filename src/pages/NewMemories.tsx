import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { camera } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import './NewMemories.css'
import { useState } from 'react';

const NewMemories: React.FC = () => {
  const [takenPhoto, setTakenPhoto] = useState<{
    path: string,
    preview: string
  }>()

  const takePhotoHandler = async () => {
    const photo = Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 80,
      width: 500,
    })
    console.log(photo)

    if(!photo || !(await photo).path || !(await photo).webPath){
      return
    }

    setTakenPhoto({
      path: (await photo).path!,
      preview: (await photo).webPath!
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Add New Memory</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h2>Memory Title</h2>  
        <IonRow className="ion-text-center">
          <IonCol>
            <div className="image-preview">
              {!takenPhoto && <h3>No photo choosen.</h3>}
              {takenPhoto && <img src={takenPhoto.preview} alt='Preview' />}
            </div>
            <IonButton fill="clear" onClick={takePhotoHandler}>
              <IonIcon slot="start"  icon={camera} />
              <IonLabel>Take Photo</IonLabel>
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow className="ion-margin-top">
          <IonCol className="ion-text-center">
            <IonButton>Add Memory</IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default NewMemories;
