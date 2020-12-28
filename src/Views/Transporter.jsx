import React, { useState, useEffect } from 'react';
import {
    Badge,
    Statistic
} from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { usePosition } from '../custom-hooks/usePosition';
import GoogleMap from 'google-map-react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Marker from '../Components/Marker';
//const socket = io('https://godview-server.herokuapp.com');
const socket = io(`${process.env.REACT_APP_SERVER}/user`, {
    query: {
        foo: 'bar'
    }
});

const socketV2 = io(`${process.env.REACT_APP_SERVER}/admin`, {
    forceNew: true,
    query: {
        foo: 'bar'
    }
});


const Transporter = ({ watch, settings, location }) => {


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
            socketV2.on('disconnect', 'theboss');
        }
    }, []);


    useEffect(() => {

        console.log(`Location was updated!`);
        setMarker({
            lat: latitude,
            lng: longitude
        })

        let roomId = location.search.substring(1);


        let data = {
            lat: latitude,
            lng: longitude
        }
        let data2 = {
            lat: latitude,
            lng: longitude,
            username: roomId,
            timestamp: timestamp
        }


        socket.emit('position', roomId, data);
        socketV2.emit('position', data2);


    }, [timestamp, latitude, longitude]);



    return (
        <>
            {/* <h1 onClick={shamimBhai}>The new transporter page {marker.lat} , {marker.lng} </h1> */}
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

                <div style={{ height: '30vh', padding: '2rem 4rem', display: 'flex', flexDirection: 'column', backgroundColor: '#171717' }}>
                    <Badge style={{ color: 'white' }} status="processing" text={`Latitude: ${latitude}`} />
                    <Badge style={{ color: 'white' }} status="processing" text={`Longitude: ${longitude}`} />
                    <Badge style={{ color: 'white' }} status="processing" text={`Timestamp: ${timestamp}`} />
                    <Badge style={{ color: 'white' }} status="processing" text={`Accuracy: ${accuracy && `${accuracy}m`}`} />
                    <Badge style={{ color: 'white' }} status="processing" text={`Speed: ${speed}`} />
                    <br />

                    <span style={{ color: '#1890FF', fontSize: '16px', fontWeight: 700 }}>This is a beta of Godview, which is an under-construction geolocation tracking app engineered by Shamim Ferdous!</span>

                    <br />
                </div>

                <div style={{ height: '700px', width: '100%' }}>
                    <GoogleMap
                        bootstrapURLKeys={{ key: 'AIzaSyCvv_c6oudIDXsjU5bVR7Y3uL_2mK1NcfU' }}
                        //defaultCenter={center}
                        defaultZoom={zoom}
                        center={marker}
                        yesIWantToUseGoogleMapApiInternals
                    >
                        <Marker
                            lat={latitude}
                            lng={longitude}
                            username={location.search.substring(1)}
                            timestamp={timestamp}
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


