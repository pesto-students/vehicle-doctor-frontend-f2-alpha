import { Button, Modal } from 'react-bootstrap';
import { Dealer } from '../../Interfaces/DealerInterface';
import { DealerService } from '../../Interfaces/DealerServiceInterface';
import { BOOKNOW} from '../../Constants/common.constant';

type Props = {
  open: boolean;
  handleClose: (val: boolean) => void;
  dealerData: Dealer;
  serviceData: DealerService;
}

const ViewDealer: React.FC<Props> = ({ open, handleClose, dealerData, serviceData }) => {
  return (
    <>
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={open} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>Dealer Information</Modal.Header>
        <Modal.Body>
          <div className="divModal">
            <p>
              <b>Name:</b> {dealerData.name}
              <b>GST No:</b>{dealerData.gst_no}
              <b>Location :</b>{dealerData.locality}-{dealerData.city}-{dealerData.state}
              {/* <b>Service Selected :</b>{serviceData.serviceTypes.service_type} */}
              <b>Service Selected :</b>{serviceData.discription}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="primary"
          >{BOOKNOW}</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ViewDealer;