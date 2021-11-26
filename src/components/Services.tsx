import  { useEffect, useState } from 'react';
import { Service } from '../Interfaces/IServiceInterfaces';
import  { AxiosResponse } from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import serviceImg from '../img/s1.jpg';
import DealerList from './DealerList';
import logo from '../img/logo.jpg';
import { Modal } from 'react-bootstrap';

function Services() {
    const [serviceData, setServiceData] = useState<Service[]>([]);
    const [showBook, setShowBook] = useState<boolean>(false);
    const [serviceId, setServiceId] = useState<any>();

    const handleShow = (id:any) => {
		setServiceId(id);
        setShowBook(!showBook)
        console.log(id);
	};

    useEffect(() => {
        axios.get<Service[]>('/service/types/GeneralService')
            .then((response: AxiosResponse) => {
                setServiceData(response.data);
            })
    }, []);
    return (
        <>
            <div id="services" style={{ padding: '5%' }} className="anim">
                <div>
                    <h3>OUR SERVICES</h3>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                    {
                        serviceData.map((item, idx) =>
                            <div style={{ margin: '10px' }} key={idx}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={serviceImg}
                                            alt="icon"
                                        />
                                        <CardContent>
                                            <button onClick={() => handleShow(`${item.id}`)}>{item.service_type}</button>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                        )
                    }
                </div>
            </div>
            <Modal fullscreen aria-labelledby="contained-modal-title-vcenter" centered show={showBook} onHide={() => setShowBook(!showBook)}>
                <Modal.Header closeButton style={{ backgroundColor: '#f8f9fa' }}>
                    <img src={logo} width='30px' className='d-inline-block align-top' alt='logo' />
                    <b>VehicleDr.com</b>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'lightgray' }}>
                    <DealerList id={serviceId} />
                </Modal.Body>
            </Modal>
        </>
    );

}

export default Services;