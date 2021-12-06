import { Modal } from 'react-bootstrap';
import logo from '../img/logo.jpg';
import DealerList from './DealerList';

type Props = {
    open: boolean;
    handleClose: (val: boolean) => void;
    serviceData:any;
    Id:any;
	setToken:(val:any) => void;
    token:any;
}


const DealerListBaseModal: React.FC<Props> = ({ open, handleClose,serviceData ,Id,setToken,token}) => {

    return (
        <>
            <Modal fullscreen aria-labelledby="contained-modal-title-vcenter" centered show={open} onHide={handleClose}>
                <Modal.Header closeButton style={{ backgroundColor: '#f8f9fa' }}>
                    <img src={logo} width='30px' className='d-inline-block align-top' alt='logo' />
                    <b>VehicleDr.com</b>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'lightgray' }}>
                    <DealerList serviceData={serviceData}  Id={Id} SetToken={setToken} Token={token}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DealerListBaseModal;