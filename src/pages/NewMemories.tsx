import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { camera } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import './NewMemories.css'
import { useContext, useRef, useState } from 'react';
import { Directory, Filesystem } from "@capacitor/filesystem";
import { base64FromPath } from "@ionic/react-hooks/filesystem";
import MemoriesContext from '../data/memories-context';
import { useHistory } from 'react-router';

const NewMemories: React.FC = () => {
  const [takenPhoto, setTakenPhoto] = useState<{
    path: string | undefined,
    preview: string
  }>()

  const [choosenMemoryType, setChoosenMemoryType] = useState<'good'|'bad'>('good')
  const titleRef = useRef<HTMLIonInputElement>(null)

  const memoriesCtx = useContext(MemoriesContext)
  const history = useHistory()

  const selectMemoryHandler = (event: CustomEvent) => {
    const selectMemoryType = event.detail.value
    setChoosenMemoryType(selectMemoryType)
  }

  const takePhotoHandler = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 80,
      width: 500,
    })
    console.log(photo)

    if(!photo || !photo.webPath!){
      return
    }

    setTakenPhoto({
      path: photo.path!,
      preview: photo.webPath!
    })
  }

  const addMemoryHandler = async () => {
    const enteredTitle = titleRef.current?.value
    if(!enteredTitle || enteredTitle.toString().trim().length === 0 || !takenPhoto || !choosenMemoryType){
      console.info(`enteredTitle: ${enteredTitle}`)
      console.info(`takenPhoto: ${takenPhoto}`)
      console.info(`choosenMemoryType: ${choosenMemoryType}`)
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

    // Add to Context
    memoriesCtx.addMemory(fileName, base64, enteredTitle.toString(), choosenMemoryType)
    history.length > 0 ? history.goBack() : history.replace('/good')
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
      <IonContent fullscreen className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Memory Title</IonLabel>
          <IonInput type="text" ref={titleRef}></IonInput>  
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Memory Type</IonLabel>
          <IonSelect onIonChange={selectMemoryHandler} value={choosenMemoryType}>
            <IonSelectOption value='good'>Good Memory</IonSelectOption>
            <IonSelectOption value='bad'>Bad Memory</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonRow className="ion-text-center ion-padding">
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
      </IonContent>
    </IonPage>
  );
};

export default NewMemories;
