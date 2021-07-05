import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import GoogleMap from 'google-map-react';
import { usePosition } from '../custom-hooks/usePosition';
import useInterval from '../custom-hooks/useInterval';
import { Badge } from "antd";
import PropTypes from 'prop-types';
import { socket } from '../utils';



const Receiver = ({ location, settings }) => {

    const {
        latitude,
        longitude,
        timestamp,
        accuracy,
        speed,
        error,
    } = usePosition(true, settings);

    console.log(`Receiver listening`)

    const [transporter, setTransporter] = useState({
        lat: 23.955413,
        lng: 90.337844,
    });

    const [message, setMessage] = useState('No Message');
    const [isActivate, setIsActive] = useState(false);
    const [delay, setDelay] = useState(30000);
    const [calling, setCalling] = useState(false);

    useEffect(() => {


        // listening for delivery request
        socket.on('request-for-delivery', (data) => {
            console.log(data);
            console.log('Someone is requesting delivery');
            setMessage('Someone is requesting delivery');
            setCalling(true);

            setTimeout(() => {
                console.log('Delivery request timed out!');
                setCalling(false);
                socket.emit('request-denied', { type: 'implicit' });
            }, [15000]);
        });


        // socket.emit('join', location.search.substring(1));


        // socket.on('otherPositions', data => {
        //     console.log(data);
        //     setTransporter({
        //         lat: data.lat,
        //         lng: data.lng
        //     })
        // })


    }, []);

    //defining activateRider function
    const activateRider = () => {
        let userID = location.search.substring(1);

        //joining the socket server
        socket.emit('join', {
            userID: userID,
            status: 'active',
            location: {
                type: 'Point',
                address: 'Some Address',
                coordinates: [
                    90.3578912,
                    23.7646882
                ]
            }
        }); //Join a room, room name is the userId itself!

        // setIsActive(true);
    }


    useInterval(
        () => {
            // Your custom logic here
            console.log('Emitting location...');
            let payload = {
                userID: location.search.substring(1),
                location: {
                    type: 'Point',
                    address: 'Some Address',
                    coordinates: [
                        latitude,
                        longitude
                    ]
                }
            }
            socket.emit('update-rider-location', payload);
        },
        // Delay in milliseconds or null to stop it
        isActivate ? delay : null,
    )

    return (
        <>
            <h1>{message}</h1>
            <button onClick={activateRider}>Activate - Look for delivery request</button>
            {
                calling
                    ?
                    <span style={{ color: 'red' }}>Accept Request</span>
                    :
                    null
            }
            <br />
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

Receiver.propTypes = {
    watch: PropTypes.bool,
    settings: PropTypes.object,
}


