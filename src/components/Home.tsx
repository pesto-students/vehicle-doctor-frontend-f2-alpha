import { useState ,useEffect} from 'react';
import { Button, Modal } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { DealerService } from '../Interfaces/IDealerServiceInterface';
import { Dealer } from '../Interfaces/IDealerInterface';
import { AxiosResponse } from 'axios';
import useVehicleData from '../Hooks/VehicleDataHook';
import axios from '../BaseURL';
import Booking from './Booking';
import LoginModal from './Customer/LoginModal';

type Props={
	Token:any;
	SetToken:(val:any) => void;
	City:any;
}

const Home: React.FC<Props> = ({Token,SetToken,City}) => {
	const [open, setOpen] = useState<boolean>(false);
	const [servicesData, setServicesData] = useState<DealerService[]>([]);
	const [dealersData, setDealersData] = useState<Dealer[]>([]);
	const [dealerData, setDealerData] = useState<Dealer>();
	const [serviceData, setServiceData] = useState<DealerService>();
	const vehicleData = useVehicleData();
	const [showLogin, setShowLogin] = useState<boolean>(false);

	useEffect(() => {
		setDealersData([]);
	  }, [City])

	const handleOpen = () => {
      if(Token==null){
		setShowLogin(true);
	  }else{
		setOpen(true);
	  }
	};

	const handleClose = () => {
		setOpen(false);
	};

	const LoginHandleClose = () => {
		setShowLogin(false);
	};

	function updateDealers(event: any, newValue: any) {
		const value = City
		setDealersData([]);
		if (newValue != null && value != null) {
			axios
				.get<Dealer[]>(`/dealer/dealersByCity/${value}/${newValue.id}`)
				.then((response: AxiosResponse) => {
					setDealersData(response.data);
				});
		}
	}

	function updateServices(event: any, newValue: any) {
		setDealerData(newValue);
		setServicesData([]);
		if (newValue != null) {
			axios
				.get<DealerService[]>(
					`/dealer/serviceByDealerID/${newValue.dealer_id}`
				)
				.then((response: AxiosResponse) => {
					setServicesData(response.data);
				});
		}
	}

	function serviceSelected(event: any, newValue: any) {
		setServiceData(newValue);
	}

	const handleCloseEmpty = () =>{

	}


	return (
		<div id='home' className='homeDiv altApp anim'>
			<table>
				<tbody>
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
						<div className='flex-container'>
							<div>
								<Autocomplete
									disablePortal
									onChange={updateDealers}
									style={{ backgroundColor: 'white' }}
									options={vehicleData}
									getOptionLabel={(option) => option.vehicle_type}
									autoHighlight
									sx={{ width: 300 }}
									renderInput={(params) => <TextField variant="filled" {...params} label='Vehicle Type' />}
								/>
							</div>
							<div>
								<Autocomplete
									disablePortal
									onChange={updateServices}
									style={{ backgroundColor: 'white' }}
									options={dealersData}
									getOptionLabel={(option) => option.name}
									autoHighlight
									sx={{ width: 300 }}
									renderInput={(params) => <TextField variant="filled" {...params} label='Dealer Name' />}
								/>
							</div>
							<div>
								<Autocomplete
									disablePortal
									onChange={serviceSelected}
									style={{ backgroundColor: 'white' }}
									options={servicesData}
									getOptionLabel={(option) => option.serviceTypes.service_name}
									autoHighlight
									sx={{ width: 300 }}
									renderInput={(params) => <TextField variant="filled"{...params} label='Services' />}
								/>
							</div>
						</div>
						<div>
							<Button size-="lg" style={{ margin: '2%' }} variant='primary' onClick={handleOpen} disabled={!vehicleData || !dealerData || !serviceData}>
								BOOK NOW
							</Button>
						</div>
					</td>
				</tr>
				</tbody>
			</table>

			<Modal fullscreen aria-labelledby="contained-modal-title-vcenter" centered show={open} onHide={handleClose}>
				<Modal.Header closeButton style={{ color: 'white', backgroundColor: '#0275d8' }}>Booking Details</Modal.Header>
				<Modal.Body style={{backgroundColor:'lightgrey'}}>
					<div>
						{dealerData && serviceData ? <Booking SelectedDealer={dealerData} serviceData={serviceData} handleClose={handleClose} customerData={Token} isHome={true} handleDealer={handleCloseEmpty} /> : null}
					</div>
				</Modal.Body>
			</Modal>

			<LoginModal open={showLogin} handleClose={LoginHandleClose} setToken={SetToken}  SelectedDealer={dealerData}  serviceData={serviceData}  IsLogin={false} isHome={true} handleDealer={handleCloseEmpty} />


		</div>
	);
}

export default Home;
