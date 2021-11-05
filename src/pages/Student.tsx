import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import axios, {AxiosResponse} from 'axios';
import { add } from 'ionicons/icons';
interface StudentModel{
  nim: string;
  nama: string;
  prodi: string;
  foto: string;
}

const Student: React.FC = () => {
  const [data, setData] = useState<AxiosResponse>()
  const [students, setStudents] = useState<Array<StudentModel>>([])
  const url = "http://localhost/student/select_all_students.php"
  
  useEffect(() => {
    axios.get(url)
      .then(response => {
        console.log(response)
        setData(response)
        setStudents(response?.data.students)
      })
  }, [])

  const getAllDataHandler = () => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setStudents(data.students)
        console.log(data)
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
        <IonButton onClick={getAllDataHandler}>Get All Data</IonButton>
        <IonList>
          {students.map((student) => {
            return <IonItem key={student.nim}>
              <IonAvatar slot='start'>
                <img src={"http://localhost/memories/" + (student.foto ? student.foto : 'uploads/man.jfif')} alt="" />
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
