import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRouterLink, IonSegment, IonSegmentButton, IonText, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { heartCircleOutline, linkOutline, mapOutline, shareOutline } from 'ionicons/icons';
import Title from '../components/Title';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [tabs, setTabs] = useState<'trips' | 'saves' | 'bookings'>('trips')

  return (
    <IonPage>
      <IonContent fullscreen>
        <div id="headerTitle">
          <Title name="Plan"/>
        </div>
        <div className='ion-padding'>
          <IonSegment value={tabs} onIonChange={e => console.log('Segment selected', e.detail.value)}>
            <IonSegmentButton value="trips">
              <IonLabel>Trips</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="saves">
              <IonLabel>Saves</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="bookings">
              <IonLabel>Bookings</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          <div id="listTrip">
            <IonItem>
              <IonIcon slot='start' icon={heartCircleOutline} size="large" />
              <IonLabel>Save places you'd like to visit</IonLabel>
            </IonItem>

            <IonItem>
              <IonIcon slot='start' icon={mapOutline} size="large" />
              <IonLabel>See your saves on a map</IonLabel>
            </IonItem>

            <IonItem>
              <IonIcon slot='start' icon={linkOutline} size="large" />
              <IonLabel>Keep track of notes, links, and more</IonLabel>
            </IonItem>

            <IonItem>
              <IonIcon slot='start' icon={shareOutline} size="large" />
              <IonLabel>Share and collaborate on your plans</IonLabel>
            </IonItem>
          </div>

          <div id="tripName">
            <IonText>Trip Name</IonText>
            <IonItem>
              <IonInput placeholder="Ex: Weekend in NYC"></IonInput>
            </IonItem>
            <IonButton id="tripButton" disabled={true} expand='full' fill="solid" shape="round">
              Create a Trip
            </IonButton>
          </div>

          <div className="ion-text-center">
            <IonRouterLink href="#"  class="underline">
              Log in to access your Trips
            </IonRouterLink>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
