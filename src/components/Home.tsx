import React, {useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import SOS from './SOS';
import DealerSearch from './DealerSearch';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { DealerService } from '../Interfaces/DealerServiceInterface';
import { Vehicle } from '../Interfaces/VehicleInterface';
import { Dealer } from '../Interfaces/DealerInterface';
import axios, { AxiosResponse } from 'axios';
import ViewDealer from '../components/elements/ViewDealerModal';


function Home() {
    const [showInfo, setShowInfo] = useState(false);
    const [showHome, setShowHome] = useState(false);
    const [open, setOpen] = useState<boolean>(false);
    let [txtName, setTxtName] = useState("");
    const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);
    const [servicesData, setServicesData] = useState<DealerService[]>([]);
    const [dealersData, setDealersData] = useState<Dealer[]>([]);
    const [dealerData, setDealerData] = useState<Dealer>();
    const [serviceData, setServiceData] = useState<DealerService>();
    useEffect(() => {
        axios.get<Vehicle[]>('http://localhost:3001/vehicle/types/')
        .then((response: AxiosResponse) => {
            setVehicleData(response.data);
        })

    }, []);

    const handleOpen  = () => {
        setOpen(true);
      };
      
      const handleClose  = () => {
        setOpen(false);
      };
     
    function updateDealers(event:any,newValue:any){
       setDealersData([])
       if(newValue != null){
        axios.get<Dealer[]>(`http://localhost:3001/dealer/dealersByCity/Moga/${newValue.id}`)
            .then((response: AxiosResponse) => {
                setDealersData(response.data);
            })
     }
     }

     function updateServices(event:any,newValue:any){
        //console.log(JSON.stringify(newValue, null, ' '));
        setDealerData(newValue);
        setServicesData([]);
        if(newValue != null){
            axios.get<DealerService[]>(`http://localhost:3001/dealer/serviceByDealerID/${newValue.dealer_id}`)
                .then((response: AxiosResponse) => {
                    setServicesData(response.data);
                })
        }
     }

     function serviceSelected(event:any,newValue:any){
        setServiceData(newValue);
     }

    /**
     * this method willl
     * @param name -
     * @returns 
     */
    // function handleShow() : void{
    //     setShowInfo(false);
    //     setShowHome(true);
    //   }


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
                        <div><Autocomplete disablePortal  onChange={updateDealers}  style={{backgroundColor: 'white'}}    options={vehicleData} getOptionLabel={option => option.vehicle_type} autoHighlight sx={{ width: 300 }} renderInput={(params) => <TextField {...params} label="Vehicle Type" />} /></div>
                        <div><Autocomplete disablePortal  onChange={updateServices} style={{backgroundColor: 'white'}} options={dealersData} getOptionLabel={option => option.name} autoHighlight sx={{ width: 300 }} renderInput={(params) => <TextField {...params} label="Dealer Name" />} /></div>
                        <div><Autocomplete disablePortal onChange={serviceSelected}  style={{backgroundColor: 'white'}} options={servicesData} getOptionLabel={option => option.serviceTypes.service_type} autoHighlight sx={{ width: 300 }} renderInput={(params) => <TextField {...params} label="Services" />} /></div>
                        <div><Button size="lg" style={{margin:'2%'}} variant="primary" onClick={handleOpen}>SEARCH</Button></div>
                    </div>
                    </td>
                </tr>
            </table>
            
            {
            dealerData && serviceData? <ViewDealer open={open} dealerData={dealerData} serviceData={serviceData} handleClose={handleClose}/> :null
            }

            {/* <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={showInfo} onHide={() => setShowInfo(!showInfo)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>Dealer Information</Modal.Header>
                <Modal.Body>
                    <div className="divModal">
                    {}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" variant="primary" 
                    >BOOK NOW</Button>
                </Modal.Footer>
            </Modal>             */}
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