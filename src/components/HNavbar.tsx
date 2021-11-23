import React, {useState} from 'react';
import { Nav, Container, Navbar, Button, Modal } from 'react-bootstrap';
import SOS from './SOS';
import logo from '../img/logo.jpg';
import { ROADSIDE_ASSISTANCE } from '../Constants/common.constant';
import {
    Link
  } from "react-router-dom";

const HNavbar: React.FunctionComponent =() => {
    const [show, setShow] = useState<boolean>(false);
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
                            <Button variant="danger" onClick={() => setShow(!show)}>{ROADSIDE_ASSISTANCE}</Button>
                            <Nav.Link href="#home">HOME</Nav.Link>
                            <Nav.Link href="#services">SERVICES</Nav.Link>
                            <Nav.Link href="#rewards">TESTIMONIALS</Nav.Link>
                            <Nav.Link href="#contactUs">CONTACTUS</Nav.Link>
                            <Button variant="outline-primary">LOGIN</Button>
                            <Button variant="outline-primary">PARTNERS</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>                       
            <Modal aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={() => setShow(!show)}>
                <Modal.Header closeButton style={{color:'white',backgroundColor:'#d9534f'}}>ROADSIDE ASSISTANCE</Modal.Header>
                <Modal.Body>
                    <div className="divModal">
                        <SOS/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button size="sm" variant="primary" onClick={() => setShow(!showHome)}>Register</Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default HNavbar;