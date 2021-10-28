import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const LocationItem: React.FC<{
  selectPos: (e: google.maps.MapMouseEvent)=> void, 
  lat: number, 
  lng: number,
  containerStyle: {},
}> = props => {
  const {selectPos,lat,lng,containerStyle} = props

  return (
    <LoadScript googleMapsApiKey="AIzaSyCTI5O1n2FUwPiizdaG115Wp4Dc5939r_Y">
      <GoogleMap
        mapContainerStyle={containerStyle}
        onClick={selectPos}
        center={{lat:lat,lng:lng}}
        zoom={18}>
          <></>
          <Marker position={{lat:lat,lng:lng}} />
      </GoogleMap>
    </LoadScript>
  );
};

export default LocationItem;
