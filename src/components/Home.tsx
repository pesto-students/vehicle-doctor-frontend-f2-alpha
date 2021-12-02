import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { DealerService } from '../Interfaces/IDealerServiceInterface';
import { Dealer } from '../Interfaces/IDealerInterface';
import { AxiosResponse } from 'axios';
// import ViewDealer from './ViewDealerModal';
import useGeoLocation from '../Hooks/GeolocationHook';
import useVehicleData from '../Hooks/VehicleDataHook';
import axios from '../BaseURL';
import Booking from './Booking';

const Home: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [servicesData, setServicesData] = useState<DealerService[]>([]);
	const [dealersData, setDealersData] = useState<Dealer[]>([]);
	const [dealerData, setDealerData] = useState<Dealer>();
	const [serviceData, setServiceData] = useState<DealerService>();
	const location = useGeoLocation();
	const vehicleData = useVehicleData();
	const [selectedDealer, setSelectedDealer] = useState<Dealer>();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	function updateDealers(event: any, newValue: any) {
		const city = location?.data[0]?.address_components[3].long_name || 'Moga';
		setDealersData([]);
		if (newValue != null && city != null) {
			axios
				.get<Dealer[]>(`/dealer/dealersByCity/Moga/${newValue.id}`)
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


	return (
		<div id='home' className='homeDiv altApp anim'>
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
							<Button size-="lg" style={{ margin: '2%' }} variant='primary' onClick={handleOpen}>
								BOOK NOW
							</Button>
						</div>
					</td>
				</tr>
			</table>

			<Modal fullscreen aria-labelledby="contained-modal-title-vcenter" centered show={open} onHide={handleClose}>
				<Modal.Header closeButton style={{ color: 'white', backgroundColor: '#0275d8' }}>Booking Details</Modal.Header>
				<Modal.Body>
					<div className="divModal">
						{dealerData ? <Booking SelectedDealer={dealerData} serviceData={serviceData} handleClose={handleClose} customerData={undefined} /> : null}
					</div>
				</Modal.Body>
			</Modal>

			{/* {dealerData && serviceData ? (
				<ViewDealer
					open={open}
					dealerData={dealerData}
					serviceData={serviceData}
					handleClose={handleClose}
				/>
			) : null} */}


		</div>
	);
}

export default Home;
