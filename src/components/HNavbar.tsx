import React from 'react';
import { Nav, Container, Navbar, Button } from 'react-bootstrap';
import logo from '../img/logo.jpg';
import {
    Link
  } from "react-router-dom";

function HNavbar() {
    return (
        <div className="anim">
            <Navbar collapseOnSelect expand="lg" fixed="top" bg="light" variant="light">
                <Container>
                    <Navbar.Brand>
                        <img src={logo} width="30px" className="d-inline-block align-top" alt="logo" />
                        <b>VehicleDr.com</b>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="">SOS</Nav.Link>
                            <Nav.Link href="#home">HOME</Nav.Link>
                            <Nav.Link href="#services">SERVICES</Nav.Link>
                            <Nav.Link href="#rewards">TESTIMONIALS</Nav.Link>
                            <Nav.Link href="#contactUs">CONTACTUS</Nav.Link>
                            {/* <Button variant="outline-primary">PARTNERS</Button> */}
                            <Link to={{ pathname: '/partners' }}>

                                {/* <Button variant='outline-primary'>PARTNERS</Button> */}

                                PARTNERS

                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default HNavbar;