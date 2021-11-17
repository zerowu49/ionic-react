import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { camera } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import './NewMemories.css'
import { useContext, useRef, useState } from 'react';
import { Directory, Filesystem } from "@capacitor/filesystem";
import { base64FromPath } from "@ionic/react-hooks/filesystem";
import MemoriesContext from '../data/memories-context';
import { useHistory } from 'react-router';
import LocationItem from '../components/LocationItem';
import axios from 'axios';
import { addDoc, collection, getFirestore } from '@firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { url } from 'inspector';

const NewMemories: React.FC = () => {
  const [lat, setLat] = useState(-6)
  const [lng, setLng] = useState(106)

  const [choosenMemoryType, setChoosenMemoryType] = useState<'good'|'bad'>('good')
  const titleRef = useRef<HTMLIonInputElement>(null)
  const [takenPhoto, setTakenPhoto] = useState<{
    path: string | undefined;
    preview: string;
  }>();
  const history = useHistory()

  // Add to Firestore
  const [presentToast, dismissToast] = useIonToast();
  const db = getFirestore()
  const storage = getStorage()

  const selectMemoryHandler = (event: CustomEvent) => {
    const selectMemoryType = event.detail.value
    setChoosenMemoryType(selectMemoryType)
  }

  const takePhotoHandler = async () => {
    const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 80,
        width: 500
    });

    console.log(photo);

    if (!photo || /* !photo.path || */ !photo.webPath) {
        return;
    }

    setTakenPhoto({
        path: photo.path,
        preview: photo.webPath
    });
  };

  const addMemoryHandler = async () => {
    presentToast({
      message: 'Adding your memory...',
    });

    const fileName = new Date().getTime() + '.jpeg';
    const base64 = await base64FromPath(takenPhoto!.preview);

    fetch(base64, {
        headers: {
            "Content-Type": "application/octet-stream",
        },
        credentials: 'include'
    }).then(res => res.blob()).then(blob => {
        uploadBytes(ref(storage, fileName), blob).then((snapshot) => { 
            getDownloadURL(ref(storage, fileName)).then((url) => {
              submitTextData(url, fileName);
            }).then(() => {
              history.replace('/' + choosenMemoryType)
              dismissToast();
            }).catch(_ => {
              dismissToast();
              presentToast({
                message: 'Failed to add memories...',
                color: 'danger',
                duration: 500,
              });
            });
        }).catch(_ => {
          dismissToast();
          presentToast({
            message: 'Failed to add image...',
            color: 'danger',
            duration: 500,
          });
        });
    }).catch(_ => {
      dismissToast();
      presentToast({
        message: 'Something error with image...',
        color: 'danger',
        duration: 500,
      });
    });
    
    // const storageRef = ref(storage,fileName)
    // uploadBytes(storageRef,selectedFile as Blob).then((res) =>{
    //   console.log("Upload success: ",res)
    //   getDownloadURL(storageRef).then(url => {
    //     submitTextData(url)
    //   }).catch(err => {
    //     console.log("Failed get downnload url: ",err)
    //   })
    // }).catch(err => {
    //   console.log("Upload error: ",err)
    // })
  }

  const submitTextData = async (url:string, fileName: string) => {
    const enteredTitle = titleRef.current?.value
    if (!enteredTitle || 
      enteredTitle.toString().trim().length === 0 || 
      !takenPhoto || 
      !choosenMemoryType) {
      return;
    }
    // Add to database
    try {    
      const docRef = await addDoc(collection(db,'memories'),{
        title: enteredTitle?.toString(),
        id: Math.random().toString(),
        foto: fileName,
        fotoUrl: url,
        type: choosenMemoryType,
        photo: takenPhoto!.preview,
        longitude: lng.toString(),
        latitude: lat.toString(),
      })
      dismissToast()
      presentToast({
        message: `Document written with id: ${docRef.id}`,
        color: 'success',
        duration: 1000,
      })
    } catch (err) {
      dismissToast()
      presentToast({
        message: `Error adding document: ${err}`,
        color: 'danger',
        duration: 1000,
      })
    }

  }

  const selectPos = (e: google.maps.MapMouseEvent) => {
    console.log("selected")
    console.warn(e)
    if(e.latLng?.lat()) setLat(e.latLng?.lat())
    if(e.latLng?.lng()) setLng(e.latLng?.lng())
  }

  
  const containerStyle = {
    width: '100%',
    height: '10rem',
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
              {!takenPhoto && <h3>No Photo Chosen.</h3>}
              {takenPhoto && <img src={takenPhoto.preview} alt="Preview" />}
            </div>
            <IonButton fill="clear" onClick={takePhotoHandler}>
              <IonIcon slot="start"  icon={camera} />
              <IonLabel>Take Photo</IonLabel>
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <></>
            <LocationItem lat={lat} lng={lng} selectPos={selectPos} containerStyle={containerStyle}/>
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
