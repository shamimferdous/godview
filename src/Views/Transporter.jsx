import React, { useState, useEffect } from 'react';
import {
    Badge
} from 'antd';
import { usePosition } from '../custom-hooks/usePosition';
import GoogleMap from 'google-map-react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
const socket = io('https://godview-server.herokuapp.com');

const Transporter = ({ watch, settings, location }) => {


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
    } = usePosition(true, settings);


    useEffect(() => {

        let roomId = location.search.substring(1);
        socket.emit('join-room', roomId);


        return () => {
            socket.on('disconnect');
        }
    }, []);


    useEffect(() => {

        console.log(`Location was updated!`);
        setMarker({
            lat: latitude,
            lng: longitude
        })


        let data = {
            lat: latitude,
            lng: longitude,
            timestamp: timestamp
        }

        let roomId = location.search.substring(1);
        socket.emit('position', roomId, data);


    }, [timestamp, latitude, longitude]);


    const shamimBhai = () => {
        setMarker({
            lat: '1234',
            lng: '213212'
        })
    }
    return (
        <>
            <h1 onClick={shamimBhai}>The new transporter page {marker.lat} , {marker.lng} </h1>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

                <div style={{ height: '30vh' }}>
                    <code>
                        latitude: {latitude}<br />
                    longitude: {longitude}<br />
                    timestamp: {timestamp}<br />
                    accuracy: {accuracy && `${accuracy}m`}<br />
                    speed: {speed}<br />
                    error: {error}
                        <br />
                        <span style={{ color: 'red' }}>Godview is an underconstruction geolocation tracking app engineered by Shamim Ferdous!</span>
                    </code>
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
                            info={latitude}
                            text={marker.lat + ', ' + marker.lng}
                        />
                    </GoogleMap>
                </div>


            </div>
        </>
    );
}

export default Transporter;


Transporter.propTypes = {
    watch: PropTypes.bool,
    settings: PropTypes.object,
}


const AnyReactComponent = ({ text, info }) => <div className="dot" style={{ color: 'red' }}>  <Badge status="error" /> {text} </div>;