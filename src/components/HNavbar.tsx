import React from 'react';
import { Nav, Container, Navbar,Button } from 'react-bootstrap';
import logo from '../img/logo.jpg';
import '../App.css';

function HNavbar() {
    return (
        <div>
            <Navbar  collapseOnSelect expand="lg" fixed="top" bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand style={{fontSize:'30px'}} >
                        <img src={logo} width="40px" className="d-inline-block align-top" alt="logo" />
                        
                    </Navbar.Brand>
                    <br />
                    <Navbar.Brand>VehicleDr</Navbar.Brand>
                    
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#services">Services</Nav.Link>
                            <Nav.Link href="#rewards">Testimonials</Nav.Link>
                            <Nav.Link href="#contactUs">ContactUs</Nav.Link>
                            <Button variant="outline-primary">For DEALER</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default HNavbar;