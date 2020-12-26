import logo from './logo.svg';
import './App.css';
import GoogleMap from 'google-map-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Demo } from './demo';
import { usePosition } from './custom-hooks/usePosition';
import {
  Badge
} from 'antd';

function App({ watch, settings }) {

  const [center, setCenter] = useState({
    lat: 59.95,
    lng: 30.33
  });

  const [zoom, setZoom] = useState(16);

  const [marker, setMarker] = useState({
    lat: 23.955413,
    lng: 90.337844,
  })


  const {
    latitude,
    longitude,
    timestamp,
    accuracy,
    speed,
    error,
  } = usePosition(watch, settings);


  useEffect(() => {

    console.log(`Timestamp was changed`);
    setMarker({
      lat: latitude,
      lng: longitude
    })

    // navigator?.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
    //   const pos = { lat, lng }
    //   console.log(pos);

    //   setMarker({
    //     lat: pos.lat,
    //     lng: pos.lng
    //   })
    // })

  }, [timestamp]);



  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

      <div style={{ height: '30vh' }}>
        <Demo watch />

      </div>

      <div style={{ height: '700px', width: '100%' }}>
        <GoogleMap
          bootstrapURLKeys={{ key: 'AIzaSyCvv_c6oudIDXsjU5bVR7Y3uL_2mK1NcfU' }}
          //defaultCenter={center}
          defaultZoom={zoom}
          center={marker}
        >
          <AnyReactComponent
            //lat={marker.lat}
            //lng={marker.lng}
            lat={latitude}
            lng={longitude}
            text="My Marker Fucking Marker"
          />
        </GoogleMap>
      </div>


    </div>

  );
}

export default App;


const AnyReactComponent = ({ text }) => <div className="dot" style={{ color: 'red' }}>  <Badge status="error" /> My Location </div>;


