import React from 'react';
import moment from 'moment';

function Marker({ username, lat, lng, timestamp }) {
    return (
        <div className="dot" style={{ color: 'red' }}>

            <svg viewBox="0 0 24 24" width={24} height={24} stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx={12} cy={10} r={3} /></svg>
            <div className="marker-div">
                <span className="marker-span">{`Name: ${username}`}</span>
                <span className="marker-span">{`Latitude: ${lat}`}</span>
                <span className="marker-span">{`Longitude: ${lng}`}</span>
                <span className="marker-span">{`Timestamp: ${moment(timestamp).format('MMMM, D YYYY - LT')}`}</span>
            </div>
        </div>
    );
}

export default Marker;