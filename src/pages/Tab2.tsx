import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonSearchbar, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import GridImage from '../components/search/GridImage';
import Title from '../components/Title';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <IonPage>
      <IonContent fullscreen >
        <div>
          <Title name="Search"/>
        </div>
        <IonToolbar id="searchbar" className="ion-padding">
          <IonSearchbar placeholder="Where to?" value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
        </IonToolbar>
        <div id="content" className="ion-padding">
          <IonCard id="cardColor" className="ion-text-center" >
            <IonCardContent>
              <h1 id="teks" className="ion-padding">See what's good nearby.</h1>
              <IonButton id="buttonColor" fill="outline" shape="round">
                Turn on location settings
              </IonButton>
            </IonCardContent>
          </IonCard>

          <h2>Destinations travellers love</h2>
          
          <IonGrid id="grid">
            <IonRow>
              <IonCol>
                <GridImage 
                  imgSrc="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-688899881-1519413300.jpg"
                  name="New York City"/>
              </IonCol>
              <IonCol>
                <GridImage 
                imgSrc="https://www.allenovery.com/global/-/media/allenovery/1_images/locations/asia_pacific/singapore/ao_hero_image_m01_countries_asia_pacific_singapore.jpg?h=854&w=1366&la=en-GB&hash=D0D16557A9B9710A49CA3131287E605A"
                  name="Singapore"/>
              </IonCol>
            </IonRow> 
            <IonRow>
              <IonCol>
                <GridImage 
                  imgSrc="https://a.cdn-hotels.com/gdcs/production143/d1112/c4fedab1-4041-4db5-9245-97439472cf2c.jpg?impolicy=fcrop&w=800&h=533&q=high"
                  name="Indonesia"/>
              </IonCol>
              <IonCol>
                <GridImage 
                  imgSrc="https://asset.kompas.com/crops/NR6BozhUCCfAAvI5Incx0-avccQ=/0x0:1024x683/750x500/data/photo/2021/05/10/609942e9cb514.jpg"
                  name="Malaysia"/>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
