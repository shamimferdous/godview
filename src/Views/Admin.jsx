import React, { useEffect } from 'react';
import { useState } from 'react';
import GoogleMap from 'google-map-react';
import {
    Badge
} from 'antd';
import Marker from '../Components/Marker';
import io from 'socket.io-client';
const socketV2 = io(`${process.env.REACT_APP_SERVER}/admin`, {
    forceNew: true,
    query: {
        foo: 'bar'
    }
});



const Admin = () => {

    const [transporters, setTransporters] = useState([]);
    const center = {
        lat: 23.774748799999998, lng: 90.36212019999999
    }

    useEffect(() => {
        socketV2.on('otherPositions', (data) => {
            console.log(data);

            setTransporters(data);
        });

        return (() => {
            socketV2.on('disconnect', 'the boss');
        });
    }, []);


    const shamimBhai = () => {
        console.log(transporters.length);
    }

    return (
        <div style={{ height: '700px', width: '100%' }}>
            <GoogleMap
                bootstrapURLKeys={{ key: 'AIzaSyCvv_c6oudIDXsjU5bVR7Y3uL_2mK1NcfU' }}
                //defaultCenter={center}
                defaultZoom={16}
                center={center}
            >
                {
                    transporters.map(transporter => {
                        return <Marker
                            key={Math.random()}
                            lat={transporter.lat}
                            lng={transporter.lng}
                            username={transporter.username}
                            timestamp={transporter.timestamp}
                        />
                    })
                }

            </GoogleMap>
        </div>
    );
};

export default Admin;

const AnyReactComponent = ({ text }) => <div className="dot" style={{ color: 'red' }}>  <Badge status="error" /> {text} </div>;