import React from 'react';
import logo from '../img/Dr.jpg';

function AboutUs() {
    return (
        <div>
            <h3>Trusted Mechanics</h3>
            <div className="flex-container">
                <div style={{ flex: '10%', margin: '3%', padding: '10px' }}>
                    <img src={logo} alt="logo" />
                </div>
                <div style={{ flex: '20%', margin: '3%', padding: '10px', textAlign:'left' }}>
                    <ol>
                        <li><h3>Expert mechanics for your every need</h3></li>
                        <li><h3>Best-in-class workmanship</h3></li>
                        <li><h3>Top of the line equipment for the best service experience</h3></li>
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;