import React, { useState, useEffect } from 'react';
import {
    Badge
} from 'antd';
import { usePosition } from '../custom-hooks/usePosition';
import { Demo } from '../demo';
import GoogleMap from 'google-map-react';
// import io from 'socket.io-client';
// const socket = io('http://localhost:4000');

const Transporter = ({ watch, settings }) => {


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

        console.log(`Location was updated!`);
        setMarker({
            lat: latitude,
            lng: longitude
        })

    }, [timestamp, latitude, longitude]);


    const shamimBhai = () => {
        setMarker({
            lat: '1234',
            lng: '213212'
        })
    }
    return (
        <>
            <h1 onClick={shamimBhai}>The transporter page</h1>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

                <div style={{ height: '30vh' }}>
                    <Demo watch />
                    <br />
                </div>

                <div style={{ height: '700px', width: '100%' }}>
                    <GoogleMap
                        bootstrapURLKeys={{ key: 'AIzaSyCvv_c6oudIDXsjU5bVR7Y3uL_2mK1NcfU' }}
                        //defaultCenter={center}
                        defaultZoom={zoom}
                        center={marker}
                    >
                        <AnyReactComponent
                            lat={latitude}
                            lng={longitude}
                            text={marker.lat + ', ' + marker.lng + ', ' + timestamp}
                        />
                    </GoogleMap>
                </div>


            </div>
        </>
    );
}

export default Transporter;


const AnyReactComponent = ({ text }) => <div className="dot" style={{ color: 'red' }}>  <Badge status="error" /> {text} </div>;