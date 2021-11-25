import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { DealerService } from '../Interfaces/DealerServiceInterface';
import { Dealer } from '../Interfaces/DealerInterface';
import axios, { AxiosResponse } from 'axios';
import ViewDealer from '../components/elements/ViewDealerModal';
import useGeoLocation from '../Hooks/GeolocationHook';
import useVehicleData from '../Hooks/VehicleDataHook';

function Home() {
	const [open, setOpen] = useState<boolean>(false);
	const [servicesData, setServicesData] = useState<DealerService[]>([]);
	const [dealersData, setDealersData] = useState<Dealer[]>([]);
	const [dealerData, setDealerData] = useState<Dealer>();
	const [serviceData, setServiceData] = useState<DealerService>();
	const location = useGeoLocation();
	const vehicleData = useVehicleData();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	function updateDealers(event: any, newValue: any) {
		const city = location?.data[0]?.address_components[3].long_name;
		setDealersData([]);
		if (newValue != null && city != null) {
			axios
				.get<Dealer[]>(`http://localhost:3001/dealer/dealersByCity/${city}/${newValue.id}`)
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
					`http://localhost:3001/dealer/serviceByDealerID/${newValue.dealer_id}`
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
									renderInput={(params) => <TextField {...params} label='Vehicle Type' />}
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
									renderInput={(params) => <TextField {...params} label='Dealer Name' />}
								/>
							</div>
							<div>
								<Autocomplete
									disablePortal
									onChange={serviceSelected}
									style={{ backgroundColor: 'white' }}
									options={servicesData}
									getOptionLabel={(option) => option.serviceTypes.service_type}
									autoHighlight
									sx={{ width: 300 }}
									renderInput={(params) => <TextField {...params} label='Services' />}
								/>
							</div>
							<div>
								<Button size='lg' style={{ margin: '2%' }} variant='primary' onClick={handleOpen}>
									SEARCH
								</Button>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<span style={{ backgroundColor: "white" }}>{location?.loaded ? location?.data[0]?.address_components[3].long_name : "Location data not avaialble"}</span>
					</td>
				</tr>
			</table>

			{dealerData && serviceData ? (
				<ViewDealer
					open={open}
					dealerData={dealerData}
					serviceData={serviceData}
					handleClose={handleClose}
				/>
			) : null}


		</div>
	);
}

export default Home;
