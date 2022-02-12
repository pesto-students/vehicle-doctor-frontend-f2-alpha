import { Button } from 'react-bootstrap';
import { ROADSIDE_ASSISTANCE } from '../Constants/common.constant';
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useVehicleData from '../Hooks/VehicleDataHook';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Service } from '../Interfaces/IServiceInterfaces';
import useGeoLocation from '../Hooks/GeolocationHook';
import axios from '../BaseURL';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import DealerListBaseModal from './DealerListBaseModal';


type Props = {
	
	Token: any;
	SetToken: (val: any) => void;
	City:any;
}

const RoadSideAssisstanceModal: React.FC<Props> = ({ Token, SetToken,City }) => {

	const [showDealer, setshowDealer] = useState<boolean>(false);
	const [serviceData, setServiceData] = useState<Service[]>([]);
	const [selectedserviceData, setSelectedServiceData] = useState<any>({});
	const [selectedvehicleID, setSelectedVehicleID] = useState<any>();
	const location = useGeoLocation();
	const vehicleData = useVehicleData();
	// function which will be invoked on click of Submit
	const handleSubmit = () => {
		setshowDealer(true);
	}

	//function to get the emergeny services names
	const updateServices = (event: any, newValue: any): void => {
		if (newValue != null) {
			const id = newValue.id;
			setSelectedVehicleID(id);
			setServiceData([]);
			axios.get<Service[]>('/service/types/SOS')
				.then((response: AxiosResponse) => {
					setServiceData(response.data);
				})
		}
	}


	const DealerListBaseModalhandleClose = () => {
		setshowDealer(false);
	};

	const serviceSelected = (event: any, newValue: any): void => {
		if (newValue != null) {
			const id = newValue.id;
			const serviceName = newValue.service_name;
			const data = { id, serviceName }
			setSelectedServiceData(data);
		}
	}


	return (
		<>
			<div id='sos'  className='anim bgimg2' style={{ padding: '5%' }}>
				<div>
					<div>
						<h3 style={{ color: 'white' }}>{ROADSIDE_ASSISTANCE}</h3>
					</div>

					<div className='divModal'>
						<div className="flex-container">
							<div style={{ margin: '3%' }}>
								<Autocomplete
									disablePortal
									onChange={updateServices}
									style={{ backgroundColor: 'white' }}
									options={vehicleData}
									getOptionLabel={(option) => option.vehicle_type}
									autoHighlight
									sx={{ width: 300 }}
									renderInput={(params) => <TextField variant="filled" {...params} label='Vehicle Type' />}
								/>
							</div>
							<div style={{ margin: '3%' }}>
								<Autocomplete
									disablePortal
									style={{ backgroundColor: 'white' }}
									onChange={serviceSelected}
									options={serviceData}
									getOptionLabel={(option) => option.service_name}
									autoHighlight
									sx={{ width: 300 }}
									renderInput={(params) => <TextField variant="filled" {...params} label='Services Name' />}
								/>
							</div>
							{/* <div style={{ textAlign: 'center', color: 'white', backgroundColor: 'rgba(0,0,0,.55)', marginBottom: '2%', border: '0.2px solid lightgray', borderRadius: '2%', padding: '1%' }}>
								<span><h6><LocationOnTwoToneIcon fontSize="medium" /> - {location?.loaded ? location?.data[0]?.formatted_address : 'XXXXXX Area Road, XXXXXXX, XXXXXXX - 114001, New Delhi, India'}</h6></span>
							</div> */}
						</div>
						<Button size-="lg" style={{ margin: '2%' }} variant='primary' onClick={handleSubmit} disabled={!vehicleData || !serviceData}>
							BOOK NOW
						</Button>
					</div>
				</div>
			</div>
			{vehicleData && serviceData ? (<DealerListBaseModal open={showDealer} handleClose={DealerListBaseModalhandleClose} serviceData={selectedserviceData} Id={selectedvehicleID} setToken={SetToken} token={Token}  city={City} />) : null}
		</>
	)
}

export default RoadSideAssisstanceModal;