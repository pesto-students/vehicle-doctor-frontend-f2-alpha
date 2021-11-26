import React from 'react';
import logo from '../img/Dr.jpg';

function AboutUs() {
    return (
        <div id="aboutus" style={{ padding: '2%' }} className="anim altApp aboutDiv">
            <h2>WHAT MAKES US DIFFERENT?</h2>
            <div className="flex-container">
                <div style={{ flex: '10%', padding: '5px' }}>
                    <img style={{ borderRadius: '50%',width:"250px" }} src={logo} alt="logo" />
                </div>
                <div style={{ flex: '20%', padding: '5px', textAlign: 'left' }}>
                    <ul>
                        <li><h3><span>Trusted</span> Mechanics</h3></li>
                        <li><h3><span>Expert</span> mechanics for your every need</h3></li>
                        <li><h3><span>Best-in-class</span> workmanship</h3></li>
                        <li><h3>Top of the line equipment for the <span>best service</span> experience</h3></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;