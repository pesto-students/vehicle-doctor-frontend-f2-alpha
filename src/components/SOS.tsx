import React from 'react';

function SOS() {
    return (
        <div>
            <h4>ROADSIDE ASSISTANCE</h4>
            <div><input type="text" id="vType" name="vType" placeholder="Vehicle" /></div>
            <div><input type="text" id="sType" name="sType" placeholder="Service" /></div>
            <div><input type="text" id="sLocation" name="sLocation" placeholder="Location" /></div>
        </div>
    );
}

export default SOS;