import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { camera } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import './NewMemories.css'
import { useRef, useState } from 'react';
import { Directory, Filesystem } from "@capacitor/filesystem";
import { base64FromPath } from "@ionic/react-hooks/filesystem";

const NewMemories: React.FC = () => {
  const [takenPhoto, setTakenPhoto] = useState<{
    path: string,
    preview: string
  }>()

  const [choosenMemoryType, setChoosenMemoryType] = useState<'good'|'bad'>('good')
  const titleRef = useRef<HTMLIonInputElement>(null)

  const selectMemoryHandler = (event: CustomEvent) => {
    const selectMemoryType = event.detail.value
    setChoosenMemoryType(selectMemoryType)
  }

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

  const addMemoryHandler = async () => {
    const enteredTitle = titleRef.current?.value
    if(!enteredTitle || enteredTitle.toString().trim().length === 0 || !takenPhoto || !choosenMemoryType){
      console.log("ada yg tidak benar")
      return
    }

    const fileName = new Date().getTime() + '.jpeg'
    const base64 = await base64FromPath(takenPhoto!.preview)
    await Filesystem.writeFile({
      path: fileName,
      data: base64,
      directory: Directory.Data,
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
        <IonInput type="text" ref={titleRef}></IonInput>  
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
            <IonButton onClick={addMemoryHandler}>Add Memory</IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonSelect onIonChange={selectMemoryHandler} value='good'>
              <IonSelectOption value='good'>Good Memory</IonSelectOption>
              <IonSelectOption value='bad'>Bad Memory</IonSelectOption>
            </IonSelect>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default NewMemories;
