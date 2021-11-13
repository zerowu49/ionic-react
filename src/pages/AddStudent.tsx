import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonToast } from "@ionic/react";
import { useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const AddStudent: React.FC = () => {
  const nim = useRef<HTMLIonInputElement>(null)
  const nama = useRef<HTMLIonInputElement>(null)
  const prodi = useRef<HTMLIonInputElement>(null)
  const [presentToast, dismissToast] = useIonToast();

  const db = getFirestore()
  const storage = getStorage()
  
  const [selectedFile, setSelectedFile] = useState<File>()
  const [fileName, setFileName] = useState('')

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target!.files![0]);
    setFileName(event.target!.files![0].name)
  }

  const addData = async(url:string) =>{
    try{
      const docRef = await addDoc(collection(db,'students'),{
        nim: nim.current?.value,
        nama: nama.current?.value,
        prodi: prodi.current?.value,
        foto: fileName,
        fotoUrl: url,
      })
      dismissToast()
      presentToast({
        message: `Document written with id: ${docRef.id}`,
        color: 'success',
        duration: 1000,
      })
    }
    catch(err){
      dismissToast()
      presentToast({
        message: `Error adding document: ${err}`,
        color: 'danger',
        duration: 1000,
      })
    }
  }

  const insertHandler = async() => {
    const storageRef = ref(storage,fileName)
    uploadBytes(storageRef,selectedFile as Blob).then((res) =>{
      console.log("Upload success: ",res)
      getDownloadURL(storageRef).then(url => {
        addData(url)
      }).catch(err => {
        console.log("Failed get downnload url: ",err)
      })
    }).catch(err => {
      console.log("Upload error: ",err)
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/student"/>
          </IonButtons>
          <IonTitle>Add Student</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonItem>
          <IonLabel position="floating">NIM</IonLabel>
          <IonInput type="text" ref={nim}></IonInput>  
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Nama</IonLabel>
          <IonInput type="text" ref={nama}></IonInput>  
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Prodi</IonLabel>
          <IonInput type="text" ref={prodi}></IonInput>  
        </IonItem>
        <IonItem>
        <input type="file" onChange={fileChangeHandler} />
        </IonItem>
        <IonButton onClick={insertHandler}>Simpan</IonButton>
      </IonContent>
    </IonPage>
  ); 
}
export default AddStudent;