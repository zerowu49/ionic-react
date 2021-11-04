import { IonAvatar, IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';

interface StudentModel{
  nim: string;
  nama: string;
  prodi: string;
  foto: string;
}

const Student: React.FC = () => {
  const [data, setData] = useState<Response>()
  const [students, setStudents] = useState<Array<StudentModel>>([])
  const url = "http://localhost/memories/select_all_students.php"
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data)
        console.log(data)
        setStudents(data.students)
      })
  }, [])

  const getAllDataHandler = () => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data)
        console.log(data)
      })
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Student</IonTitle>
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
