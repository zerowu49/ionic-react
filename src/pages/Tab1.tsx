import { IonAvatar, IonContent, IonPage } from '@ionic/react';
import Chips from '../components/explore/Chips';
import ImageWithLove from '../components/explore/ImageWithLove';
import Title from '../components/Title';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div id='header'>
          <Title name="Explore"/>
          <IonAvatar id="avatar">
            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
          </IonAvatar>
          <div id="chips">
            <Chips/>
          </div>
        </div>
        
        <div className='ion-padding'>
          <h3>You might like these</h3>
          <p>More places to stay in Jakarta</p>
          
          <ImageWithLove 
            imgSrc="https://cdn0-production-images-kly.akamaized.net/83eNIr6NoNALbf0ukgz4tBEz1ko=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3386715/original/094552600_1614241094-Double_Tree_Jakarta.jpg"
            price="IDR 499.000 / night"
            name="Hotel Aston Jakarta"/>
            {/* Carousel https://forum.ionicframework.com/t/ionic-carousel-effect/131075 */}
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
