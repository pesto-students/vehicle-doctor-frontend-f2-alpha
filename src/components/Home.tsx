import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import SOS from './SOS';
import DealerSearch from './DealerSearch';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import logo from '../img/service.jpg';
function Home() {

    const [showInfo, setShowInfo] = useState(false);
    const [showHome, setShowHome] = useState(false);
    let [txtName, setTxtName] = useState("");
    interface dealersList{
        label:string;
        value: string
    }

    /**
     * this method willl
     * @param name -
     * @returns 
     */
    function handleShow() : void{
        setShowInfo(false);
        setShowHome(true);
      }

      const dealers : dealersList = [
        { label: 'ABC', value: 1 },
        { label: 'XYZ', value: 2 },];

    return (
        <div id="home" className="homeDiv altApp anim">
            <table>
                <tr>
                    <td>
                        <h1 style={{ color: 'white' }}>BEST AUTO SERVICE IS ONE CLICK AWAY</h1>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h5 style={{ color: 'white' }}>India's most trusted auto service repairs network</h5>
                    </td>
                </tr>
                <tr>
                    <td>
                    <div className="flex-container" >
                        <div><Autocomplete disablePortal  style={{backgroundColor: 'gray'}} options={dealers} autoHighlight sx={{ width: 300 }} renderInput={(params) => <TextField {...params} label="Vehicle Type" />} /></div>
                        <div><Autocomplete disablePortal  style={{backgroundColor: 'gray'}} options={dealers} autoHighlight sx={{ width: 300 }} renderInput={(params) => <TextField {...params} label="Dealer Name" />} /></div>
                        <div><Autocomplete disablePortal  style={{backgroundColor: 'gray'}} options={dealers} autoHighlight sx={{ width: 300 }} renderInput={(params) => <TextField {...params} label="Services" />} /></div>
                        <div><Button size="lg" style={{margin:'2%'}} variant="primary" onClick={() => setShowInfo(!showInfo)}>SEARCH</Button></div>
                    </div>
                        {/* <input type="number" id="mNum" name="mNum" placeholder="Enter your Mobile No." /> */}
                    </td>
                </tr>
            </table>
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={showInfo} onHide={() => setShowInfo(!showInfo)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>Dealer Information</Modal.Header>
                <Modal.Body>
                    <div className="divModal">
                        {/* <div>NAME & E-MAIL ID -</div>
                        <input type="text" id="fName" name="fName" onChange={(e) => setTxtName(e.target.value)} placeholder="Full Name" />
                        <input type="text" id="eMailId" name="eMailId" placeholder="E-Mail" />
                    </div>
                    <div className="divModal">
                        <div>ADDRESS -</div>                        
                        <input type="text" id="houseNo" name="houseNo" placeholder="House No." />
                        <input type="text" id="street" name="street" placeholder="Street" />
                        <input type="text" id="location" name="location" placeholder="Location/City" disabled />
                        <input type="text" id="state" name="state" placeholder="State" /> */}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" variant="primary" 
                    // onClick={() => handleShow()}
                    >BOOK NOW</Button>
                </Modal.Footer>
            </Modal>            
            <Modal size="lg"  fullscreen={true} aria-labelledby="contained-modal-title-vcenter" centered show={showHome} onHide={() => setShowHome(!showHome)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>Hi {txtName} ..!</Modal.Header>
                <Modal.Body>
                    <div className="divModal">
                        <table width="100%">
                            <tr>
                                <td>
                                    <SOS/>
                                </td>
                                <td>
                                    <DealerSearch/>
                                </td>
                            </tr>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button size="sm" variant="primary" onClick={() => setShow(!showHome)}>Register</Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Home;