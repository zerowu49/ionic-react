import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonToast } from "@ionic/react";
import { useRef, useState } from "react";
import axios, {AxiosResponse} from 'axios';

const AddStudent: React.FC = () => {
  const [data, setData] = useState('')
  const url = "http://localhost/memories/insert_new_students.php"
  const nim = useRef<HTMLIonInputElement>(null)
  const nama = useRef<HTMLIonInputElement>(null)
  const prodi = useRef<HTMLIonInputElement>(null)
  const [presentToast, dismissToast] = useIonToast();

  const [selectedFile, setSelectedFile] = useState<File>()

  const showToast = (msg: string) => {
    let color 
      if(msg == "Data Mahasiswa tidak lengkap") color = 'danger'
      else color = 'success'
      
      presentToast({
        buttons: [
          { text: 'Okay', handler: () => dismissToast() },
        ],
        color: color,
        message: msg,
        duration: 2000,
      }) 
  }

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target!.files![0]);
  }

  const insertHandler = () => {
    const formData = new FormData()

    const inNim = nim.current?.value as string
    const inNama = nama.current?.value as string
    const inProdi = prodi.current?.value as string

    console.log(inNim)

    console.info(formData)
    formData.append('nim',inNim)
    formData.append('nama',inNama)
    formData.append('prodi',inProdi)
    formData.append('foto',selectedFile as File)
    console.info(formData)

    // fetch(url,{
    //   method: 'post',
    //   body: formData
    // }).then(res => res.json())
    // .then(data=>{
    //   showToast(data.message)
    // })


    axios.post(url,formData)
      .then(res => {
        console.log(res)
        showToast(res.data.message)
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