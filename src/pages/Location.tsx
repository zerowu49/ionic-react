import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Geolocation } from "@capacitor/geolocation";
import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from 'react';
import LocationItem from '../components/LocationItem';

const Location: React.FC = () => {
  const [lat, setLat] = useState(-6)
  const [lng, setLng] = useState(106)

  const getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true
    })

    console.log(`Current Pos:`,coordinates)
    console.log(`Lat:`,coordinates.coords.latitude)
    console.log(`Lng:`,coordinates.coords.longitude)
    setLat(coordinates.coords.latitude)
    setLng(coordinates.coords.longitude)
  }

  const trackPosition = async() => {
    const data = await Geolocation.watchPosition({
      enableHighAccuracy: true,
      timeout: 1000,
    },(position, err)=>{
      console.error(err)
      if(position){
        console.info(position)
      }
    })
  }

  const selectPos = (e: google.maps.MapMouseEvent) => {
    if(e.latLng?.lat()) setLat(e.latLng?.lat())
    if(e.latLng?.lng()) setLng(e.latLng?.lng())
  }

  const containerStyle = {
    width: '100%',
    height: '80%',
  }

  const pos = {lat: -6,lng:106}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Location</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={getCurrentPosition}>Current Position</IonButton>
        <IonButton onClick={trackPosition}>Track Position</IonButton>
      </IonContent>
      {/* AIzaSyAxwIz1YykJnT5cVkyQW0D0vzRa5cVsgTA */}
      <LocationItem lat={lat} lng={lng} selectPos={selectPos} containerStyle={containerStyle} />
    </IonPage>
  );
};

export default Location;
