import { Button, Modal, Carousel } from 'react-bootstrap';
import { Dealer } from '../../Interfaces/IDealerInterface';
import { DealerService } from '../../Interfaces/IDealerServiceInterface';
import { BOOKNOW } from '../../Constants/common.constant';
import React, { useState } from 'react';

type Props = {
  open: boolean;
  handleClose: (val: boolean) => void;
  dealerData: Dealer;
  serviceData: DealerService;
}

const ViewDealer: React.FC<Props> = ({ open, handleClose, dealerData, serviceData }) => {

  //For Carousel
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={open} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header style={{ color: 'white', backgroundColor: '#0275d8' }} closeButton>Dealer Information</Modal.Header>
        <Modal.Body>
          <div className="divModal flex-container" style={{backgroundColor:'lightgrey'}}>
            <div style={{flex: '50%'}}>
              <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJciEIMWzRvBHsRtof3UgG1hOUGX5GsZFo3Q&usqp=CAU"
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDRLpY3p-0UeQAaToiItwtfYehmSa-TSw2Lg&usqp=CAU"
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCCvsYNrm6G-b3bhsrnnkgk8CQJxgNVz9HsA&usqp=CAU"
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
            <div style={{ flex: '50%',width:'100%' }}>
              <ul style={{listStyleType: 'none'}}>
                <li><h4>{dealerData.name}</h4></li>
                <li><b>GST No: </b>{dealerData.gst_no}</li>
                <li><b>Location: </b>{dealerData.locality}-{dealerData.city}-{dealerData.state}</li>
                {/* <b>Service Selected :</b>{serviceData.serviceTypes.service_type} */}
                <li><b>Service Selected: </b>{serviceData.discription}</li>
              </ul>
            </div>
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