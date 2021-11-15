import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container';
import { Button, Table } from 'react-bootstrap';
import logo from '../img/service.jpg';
import Typography from '@mui/material/Typography';

function Testimonials() {
    return (
        <div id="rewards" className="ratingDiv  altApp">
            <h3>Testimonials</h3>
            <div className="flex-container">
                <div style={{borderRadius:'10px', boxShadow: '0 0 5px 0.2px', flex:'20%', margin:'3%', padding:'10px'}}>
                    <p>"A real life saver. Awesome customer service - not just from the Vehicle Dr. team but also from the on ground service partners. Goes to show the value they see in the platform. Highly recommended. Keep up!"</p>
                </div>
                <div style={{borderRadius:'10px', boxShadow: '0 0 5px 0.2px', flex:'20%', margin:'3%', padding:'10px'}}>
                    <p>"A real life saver. Awesome customer service - not just from the Vehicle Dr. team but also from the on ground service partners. Goes to show the value they see in the platform. Highly recommended. Keep up!"</p>
                </div>
                <div style={{borderRadius:'10px', boxShadow: '0 0 5px 0.2px', flex:'20%', margin:'3%', padding:'10px'}}>
                    <p>"A real life saver. Awesome customer service - not just from the Vehicle Dr. team but also from the on ground service partners. Goes to show the value they see in the platform. Highly recommended. Keep up!"</p>
                </div>
            </div>
        </div>
    );
}

export default Testimonials;