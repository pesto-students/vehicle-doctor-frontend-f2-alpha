import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function ContactUs() {
    return (
        <div id="contactUs" className="contactDiv">
            <Container>
                <Box component="div" sx={{ p: 2,color:'white'}} >
                    <p>CONTACT DETAILS</p>
                    <ul style={{listStyleType:'none', fontSize:'12px'}}>
                        <li>Service Centers: Banglore, Jaipur, Mumbai. Surat, Patna.</li>
                        <li>Contact No.: +91 9876543210, vehicle_dr@info.com</li>
                        <li>Copyright © 2021 All rights reserved.</li>
                        <li>Best Viewed with 1024 x 768 pixels  This website is best viewed in Internet Explorer Version 8 & Version 10 |  Mozilla Firefox 3.5 version</li>
                    </ul>
                </Box>
            </Container>
        </div>
    );
}

export default ContactUs;