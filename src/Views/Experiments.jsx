import React, { useState } from 'react';
import GoogleMap from 'google-map-react';
import { BiCurrentLocation } from "react-icons/bi";

const Experiments = (props) => {

    function renderPolylines(map, maps) {
        /** Example of rendering geodesic polyline */
        let geodesicPolyline = new maps.Polyline({
            path: props.markers,
            geodesic: true,
            strokeColor: '#00a1e1',
            strokeOpacity: 1.0,
            strokeWeight: 4
        })

        geodesicPolyline.setMap(map)

        /** Example of rendering non geodesic polyline (straight line) */
        let nonGeodesicPolyline = new maps.Polyline({
            path: props.markers,
            geodesic: false,
            strokeColor: '#e4e4e4',
            strokeOpacity: 0.7,
            strokeWeight: 3
        })
        nonGeodesicPolyline.setMap(map)

        fitBounds(map, maps)
    }

    function fitBounds(map, maps) {
        var bounds = new maps.LatLngBounds()
        for (let marker of props.markers) {
            bounds.extend(
                new maps.LatLng(marker.lat, marker.lng)
            )
        }
        map.fitBounds(bounds)
    }


    const [marker, setMarker] = useState({
        lat: 23.955413,
        lng: 90.337844
    });

    const center = {
        lat: 23.955413,
        lng: 90.337844
    }

    const [draggable, setDraggable] = useState(true);

    const onChangeHandler = ({ center, zoom }) => {
        console.log(center, zoom);
    }

    const onMarkerInteraction = (childKey, childProps, mouse) => {
        setDraggable(false);
        setMarker({
            lat: mouse.lat,
            lng: mouse.lng
        })
    }

    const onMarkerInteractionClose = () => {
        setDraggable(true);
    }
    return (
        <div style={{ height: '100vh' }}>

            <GoogleMap
                bootstrapURLKeys={{ key: 'AIzaSyCvv_c6oudIDXsjU5bVR7Y3uL_2mK1NcfU' }}
                defaultZoom={14}
                center={center}
                yesIWantToUseGoogleMapApiInternals
                draggable={draggable}
                onChildMouseDown={onMarkerInteraction}
                onChildMouseUp={onMarkerInteractionClose}
                onChildMouseMove={onMarkerInteraction}
            // onGoogleApiLoaded={({ map, maps }) => renderPolylines(map, maps)}
            >
                <Pin
                    lat={marker.lat}
                    lng={marker.lng}
                />
            </GoogleMap>

        </div>
    );
};

export default Experiments;


const Pin = () => {
    return (
        <div>
            <BiCurrentLocation size={32} />
        </div>
    )
}


Experiments.defaultProps = {
    markers: [
        {
            lat: 23.955413,
            lng: 90.337844
        },
        {
            lat: 23.955423,
            lng: 90.337854
        }
    ],
    center: [47.367347, 8.5500025],
    zoom: 16
}