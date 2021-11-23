import React, { useState } from 'react';
import { Nav, Container, Navbar, Button, Modal } from 'react-bootstrap';
import SOS from './SOS';
import logo from '../img/logo.jpg';
import { ROADSIDE_ASSISTANCE } from '../Constants/common.constant';
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from '@mui/material/InputAdornment';
import CallIcon from '@mui/icons-material/Call';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import Room from '@mui/icons-material/Room';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';

const HNavbar: React.FunctionComponent = () => {
    const [showSOS, setShowSOS] = useState<boolean>(false);
    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [showInfo, setShowInfo] = useState<boolean>(false);

    function handleShow(): void {
        setShowInfo(true);
        setShowLogin(false);
    }

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
                            <Button variant="danger" onClick={() => setShowSOS(!showSOS)}>{ROADSIDE_ASSISTANCE}</Button>
                            <Nav.Link href="#home">HOME</Nav.Link>
                            <Nav.Link href="#services">SERVICES</Nav.Link>
                            <Nav.Link href="#rewards">TESTIMONIALS</Nav.Link>
                            <Nav.Link href="#contactUs">CONTACTUS</Nav.Link>
                            <Button variant="outline-primary" style={{margin:'1px'}} onClick={() => setShowLogin(!showLogin)}>LOGIN</Button>
                            <Button variant="outline-primary">PARTNERS</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Modal aria-labelledby="contained-modal-title-vcenter" centered show={showSOS} onHide={() => setShowSOS(!showSOS)}>
                <Modal.Header closeButton style={{ color: 'white', backgroundColor: '#d9534f' }}>SOS</Modal.Header>
                <Modal.Body>
                    <div className="divModal">
                        <SOS />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" variant="primary" onClick={() => setShowSOS(!showSOS)}>Register</Button>
                </Modal.Footer>
            </Modal>
            <Modal size="sm" aria-labelledby="contained-modal-title-vcenter" centered show={showLogin} onHide={() => setShowLogin(!showLogin)} backdrop="static" keyboard={false}>
                <Modal.Header className="modalHeader" closeButton>Login</Modal.Header>
                <Modal.Body>
                    <div className="divModal">
                        <TextField
                            id="input-with-icon-textfield"
                            label="Mobile"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CallIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" variant="primary" onClick={handleShow}>SEND OTP</Button>
                </Modal.Footer>
            </Modal>
            <Modal size="sm" aria-labelledby="contained-modal-title-vcenter" centered show={showInfo} onHide={() => setShowInfo(!showInfo)} backdrop="static" keyboard={false}>
                <Modal.Header  className="modalHeader" closeButton>Profile Information </Modal.Header>
                <Modal.Body>
                    <div className="divModal">
                        <div  className="modalBody">
                            <TextField
                                id="input-with-icon-textfield"
                                label="Name"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                        </div>
                        <div  className="modalBody">
                            <TextField
                                id="input-with-icon-textfield"
                                label="E-Mail"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                        </div>
                        <div  className="modalBody">
                            <TextField
                                id="input-with-icon-textfield"
                                label="Locality/Street"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MapsHomeWorkIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                        </div>
                        <div  className="modalBody">
                            <TextField
                                id="input-with-icon-textfield"
                                label="City"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationCityIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                        </div>
                        <div  className="modalBody">
                            <TextField
                                id="input-with-icon-textfield"
                                label="State"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Room />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" variant="primary" onClick={() => setShowInfo(!showInfo)}>REGISTER</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default HNavbar;