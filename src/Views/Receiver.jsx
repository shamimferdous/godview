import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import GoogleMap from 'google-map-react';
import io from 'socket.io-client';
import { Badge } from "antd";
const socket = io('https://godview-server.herokuapp.com');

const Receiver = ({ location }) => {

    const [transporter, setTransporter] = useState({
        lat: 23.955413,
        lng: 90.337844,
    });

    useEffect(() => {

        let roomId = location.search.substring(1);

        console.log('Receiver useEffect');
        socket.emit('join-room', roomId);
        socket.on('otherPositions', data => {
            console.log(data);
            setTransporter({
                lat: data.lat,
                lng: data.lng
            })
        })
    }, []);
    return (
        <>
            <h1>The receiver page</h1>
            <div style={{ height: '700px', width: '100%' }}>
                <GoogleMap
                    bootstrapURLKeys={{ key: 'AIzaSyCvv_c6oudIDXsjU5bVR7Y3uL_2mK1NcfU' }}
                    //defaultCenter={center}
                    defaultZoom={16}
                    center={transporter}
                >
                    <AnyReactComponent
                        lat={transporter.lat}
                        lng={transporter.lng}
                        text={transporter.lat + ', ' + transporter.lng}
                    />
                </GoogleMap>
            </div>
        </>
    );
}

export default Receiver;


const AnyReactComponent = ({ text }) => <div className="dot" style={{ color: 'red' }}>  <Badge status="error" /> {text} </div>;