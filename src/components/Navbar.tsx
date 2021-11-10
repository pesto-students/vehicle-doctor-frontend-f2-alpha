import React from 'react';
import { Nav } from 'react-bootstrap';
import logo from '../img/VehicleDr_logo.jpg';
import '../App.css';

function Navbar() {
    return (
        <div>
            <Nav>
                <img alt="icon" src={logo} width="100%" height="10%" />
            </Nav>
        </div>
    );
}

export default Navbar;