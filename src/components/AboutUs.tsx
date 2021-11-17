import React from 'react';
import logo from '../img/Dr.jpg';

function AboutUs() {
    return (
        <div style={{ padding: '5%' }} className="anim altApp aboutDiv">
            <h2>WHAT MAKES US DIFFERENT?</h2>
            <div className="flex-container">
                <div style={{ flex: '10%', margin: '3%', padding: '10px' }}>
                    <img style={{ borderRadius: '50%' }} src={logo} alt="logo" />
                </div>
                <div style={{ flex: '20%', margin: '3%', padding: '10px', textAlign: 'left' }}>
                    <ul>
                        <li><h3><span>Trusted</span> Mechanics</h3></li>
                        <li><h3><span>Expert</span> mechanics for your every need</h3></li>
                        <li><h3><span>Best-in-class</span> workmanship</h3></li>
                        <li><h3>Top of the line equipment for the <span>best service</span> experience</h3></li>
                    </ul>
                </div>
            </div>
            <div className="flex-container">
                <div className="divInfo">
                    <h1>24 x 7</h1>
                    <p>Service</p>
                </div>
                <div className="divInfo">
                    <h1>45682+</h1>
                    <p>Client Served</p>
                </div>
                <div className="divInfo">
                    <h1>25+</h1>
                    <p>Service Stations</p>
                </div>
                <div className="divInfo">
                    <h1>1236+</h1>
                    <p>Vehicle Serviced</p>
                </div>
                <div className="divInfo">
                    <h1>31+</h1>
                    <p>Auto-Serviced Everyday</p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;