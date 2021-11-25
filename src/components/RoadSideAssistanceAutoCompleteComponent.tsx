import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useVehicleData from '../Hooks/VehicleDataHook';
import  { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Service } from '../Interfaces/ServiceInterfaces';
import useGeoLocation from '../Hooks/GeolocationHook';
import axios from '../BaseURL';

const RoadSideAssistanceAutoCompleteComponent: React.FC = () => {
	const [serviceData, setServiceData] = useState<Service[]>([]);
	const location = useGeoLocation();
	const vehicleData = useVehicleData();
   
	//function to get the emergeny services names
	const updateServices = (event: any, newValue: any): void => {
		setServiceData([]);
		if (newValue != null) {
			axios.get<Service[]>('/service/types/SOS')
				.then((response: AxiosResponse) => {
					setServiceData(response.data);
				})
		}
	}

	return (
		<div>
			<div>
				<Autocomplete
					disablePortal
					onChange={updateServices}
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
					style={{ backgroundColor: 'white' }}
					options={serviceData}
					getOptionLabel={(option) => option.service_name}
					autoHighlight
					sx={{ width: 300 }}
					renderInput={(params) => <TextField {...params} label='Services Name' />}
				/>
			</div>
			<div>
					<TextField
						disabled
						id="outlined-disabled"
						label={location?.loaded ? location?.data[0]?.formatted_address:null}
						margin="normal"
					/>
			</div>
		</div>
	);
}

export default RoadSideAssistanceAutoCompleteComponent;