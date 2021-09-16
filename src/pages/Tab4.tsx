import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ImageReview from '../components/review/ImageReview';
import Title from '../components/Title';
import './Tab4.css';

const Tab4: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div id="headerTitle">
          <Title name="Review"/>
        </div>
        <div className='ion-padding'>
          <ImageReview 
            imgSrc="https://sawbo-animations.org/images/videoThumbnails/ACPHealthyEatingCompilation.jpg"
            text="Write a review"/>
          <ImageReview 
            imgSrc="https://images.newindianexpress.com/uploads/user/imagelibrary/2019/3/7/w600X390/Take_in_the_Scenery.jpg"
            text="Upload a Photo"/>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
