import React from 'react';
import DealerLogin from '../DealerLogin';
import { Modal } from 'react-bootstrap';
import { DEALER_LOGIN_MODAL_HEADER } from '../../Constants/common.constant';
import '../../css/dealerlogin.css';

type Props = {
	open: boolean;
	handleClose: (val: boolean) => void;
};

const DealerLoginModal: React.FC<Props> = ({ open, handleClose }) => {
	return (
		<Modal
			aria-labelledby='contained-modal-title-vcenter'
			centered
			backdrop='static'
			keyboard={false}
			contentClassName='modal-20w'
			show={open}
			onHide={handleClose}>
			<Modal.Header closeButton style={{ color: 'white', backgroundColor: '#0d6efd' }}>
				{DEALER_LOGIN_MODAL_HEADER}
			</Modal.Header>
			<Modal.Body>
				<div className='divModal'>
					<DealerLogin email={''} password={''} />
				</div>
			</Modal.Body>
			<Modal.Footer>
				{/* <Button size="sm" variant="primary" onClick={() => setShow(!showHome)}>Register</Button> */}
			</Modal.Footer>
		</Modal>
	);
};

export default DealerLoginModal;
