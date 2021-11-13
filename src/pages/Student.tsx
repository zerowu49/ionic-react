import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRouterLink, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import axios, {AxiosResponse} from 'axios';
import { add } from 'ionicons/icons';
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

interface StudentModel{
  nim: string;
  nama: string;
  prodi: string;
  foto: string;
}

const Student: React.FC = () => {
  const db = getFirestore()
  const [selectedFile, setSelectedFile] = useState<File>()
  const [fileName, setFileName] = useState('')
  const storage = getStorage()
  const [presentToast,dismissToast] = useIonToast()

  const [students, setStudents] = useState<Array<any>>([])

  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db,"students"))
      console.log('querySnapshot: ',querySnapshot)
      setStudents(querySnapshot.docs.map((doc) => ({
        ...doc.data(), id:doc.id
      })))

      querySnapshot.forEach(doc => {
        console.log(`${doc.id} => ${doc.data()}`)
        console.log(doc.data())
        console.log('doc: ',doc)
      })
    }
    getData()
  },[])

  const addData = async() =>{
    try{
      const docRef = await addDoc(collection(db,'users'),{
        first: 'John',
        last: 'Thor',
        born: 1985,
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

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target!.files![0])
    setFileName(event.target!.files![0].name)
  }

  const insertHandler = async() => {
    const storageRef = ref(storage,fileName)
    uploadBytes(storageRef,selectedFile as Blob).then((res) =>{
      console.log("Upload success: ",res)
    }).catch(err => {
      console.log("Upload error: ",err)
    })
  }

  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Student</IonTitle>
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
        <IonButton onClick={addData}>Simulate Add Data</IonButton>
        <br/>
        <input type="file" onChange={fileChangeHandler} />
        <IonButton onClick={insertHandler}>Simpan</IonButton>
        <IonList>
          {students.map(student => {
            return <IonItem key={student.id}>
              <IonAvatar slot='start'>
                <img src={student.fotoUrl}/>
              </IonAvatar>
              <IonLabel>
                {student.nim}<br/>
                {student.nama}<br/>
                {student.prodi}
              </IonLabel>
            </IonItem>
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Student;
