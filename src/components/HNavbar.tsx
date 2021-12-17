import React, { useState } from 'react';
import { Nav, Container, Navbar, Button, Modal, NavDropdown } from 'react-bootstrap';
import LoginModal from './Customer/LoginModal';
import CustomerBookingHistory from './Customer/CustomerBookingHistory';
import DealerReg from './DealerReg';
import DealerLoginModal from './Dealer/DealerLoginModal';
import logo from '../img/logo.jpg';
import useGeoLocation from '../Hooks/GeolocationHook';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import {
	ROADSIDE_ASSISTANCE,
	PARTNERS,
	DEALER_SIGNUP_MODAL_HEADER,
	SIGNUP,
	LOGIN,
	PROFILE,
	LOGOUT
} from '../Constants/common.constant';

type Props = {
	Token: any;
	SetToken: (val: any) => void;
}

const HNavbar: React.FC<Props> = ({ Token, SetToken }) => {
	const [showLogin, setShowLogin] = useState<boolean>(false);
	const [showDealer, setShowDealer] = useState<boolean>(false);
	const [showDealerLogin, setShowDealerLogin] = useState<boolean>(false);
	const [openHistory, setOpenHistory] = useState<boolean>(false);
	const location = useGeoLocation();

	

	const LoginHandleOpen = () => {
		setShowLogin(true);
	};
	const LoginHandleClose = () => {
		setShowLogin(false);
	};
	const CustomerLogout = () => {
		SetToken(null)
	}
	const handleClose = () => {
	}

	const HistoryHandleOpen = () => {
		setOpenHistory(true);
	};
	const HistoryHandleClose = () => {
		setOpenHistory(false);
	};

	return (
		<div className='anim'>
			<Navbar collapseOnSelect expand='lg' fixed='top' bg='light' variant='light'>
				<Container>
					<Navbar.Brand>
						<img src={logo} width='30px' className='d-inline-block align-top' alt='logo' />
						<b>VehicleDr.com</b>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav className='justify-content-end flex-grow-1 pe-3'>
							<Button variant='danger' href='#sos'>
								{ROADSIDE_ASSISTANCE}
							</Button>
							<Nav.Link href='#home'>SEARCH DEALER</Nav.Link>
							<Nav.Link href='#services'>SERVICES</Nav.Link>
							<Nav.Link href='#rewards'>TESTIMONIALS</Nav.Link>
							<Nav.Link href='#contactUs'>CONTACT US</Nav.Link>
							{
								Token == null ?
									<Button variant='outline-primary' style={{ margin: '1px' }} onClick={LoginHandleOpen}>
										{LOGIN}
									</Button>
									:
									<>
										<NavDropdown title={PROFILE} id='nav-dropdown-partners'>
											<NavDropdown.Item style={{ textTransform: 'uppercase' }}>
												{Token.customer_name}
											</NavDropdown.Item>
											<NavDropdown.Divider />
											<NavDropdown.Item eventKey='7.2' onClick={HistoryHandleOpen}>
												BOOKING HISTORY
											</NavDropdown.Item>											
											<NavDropdown.Divider />
											<NavDropdown.Item eventKey='7.2' onClick={CustomerLogout}>
												{LOGOUT}
											</NavDropdown.Item>
										</NavDropdown>
									</>

							}
							{Token == null ?
								<NavDropdown title={PARTNERS} id='nav-dropdown-partners'>
									<NavDropdown.Item
										eventKey='7.1'
										onClick={() => setShowDealerLogin(!showDealerLogin)}>
										{LOGIN}
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item eventKey='7.2' onClick={() => setShowDealer(!showDealer)}>
										{SIGNUP}
									</NavDropdown.Item>
								</NavDropdown>
								: null}
						</Nav>
					</Navbar.Collapse>
				</Container>
				<div style={{ marginRight: '2%' }}>
					<LocationOnOutlinedIcon /><span>{location?.loaded ? location?.data[0]?.address_components[3].long_name : "New Delhi"}</span>
				</div>
			</Navbar>

			<Modal
				aria-labelledby='contained-modal-title-vcenter'
				centered
				show={showDealer}
				onHide={() => setShowDealer(!showDealer)}>
				<Modal.Header closeButton style={{ color: 'white', backgroundColor: '#0d6efd' }}>
					{DEALER_SIGNUP_MODAL_HEADER}
				</Modal.Header>
				<Modal.Body>
					<div className='divModal'>
						<DealerReg />
					</div>
				</Modal.Body>
				<Modal.Footer>
				</Modal.Footer>
			</Modal>
			<LoginModal open={showLogin} handleClose={LoginHandleClose} setToken={SetToken} SelectedDealer={undefined} serviceData={undefined} IsLogin={true} isHome={false} handleDealer={handleClose} />
			<DealerLoginModal
				open={showDealerLogin}
				handleClose={() => setShowDealerLogin(!showDealerLogin)}
			/>
			<CustomerBookingHistory handleClose={HistoryHandleClose} open={openHistory} />
		</div>
	);
};

export default HNavbar;
