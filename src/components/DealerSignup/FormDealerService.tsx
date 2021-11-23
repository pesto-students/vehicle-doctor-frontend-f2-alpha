import React, { useState, useEffect } from 'react';
import {
	Container,
	Grid,
	TextField,
	InputLabel,
	Select,
	MenuItem,
	SelectChangeEvent,
	Typography,
	Button
} from '@mui/material';
import axios, { AxiosResponse } from 'axios';

interface Props {
	nextStep: Function;
	prevStep: Function;
	handleFormData: any;
	values: {
		vehicletype: {
			vehicle_type: string;
		};
		services: [
			{
				service_type: string;
				cost: number;
			}
		];
	};
}

interface IServices {
	id: number;
	service_type: string;
	service_name: string;
}

interface IVehicleType {
	id: number;
	vehicle_type: string;
}

const FormDealerService: React.FC<Props> = ({ nextStep, prevStep, handleFormData, values }) => {
	const [vehicleData, setVehicleData] = useState<IVehicleType[]>([]);
	const [serviceData, setServiceData] = useState<IServices[]>([]);

	useEffect(() => {
		//Get vehicle data
		axios.get<[]>(`http://localhost:3001/vehicle/types`).then((response: AxiosResponse) => {
			setVehicleData(response.data);
		});
		//Get Service Type Data
		axios.get<[]>(`http://localhost:3001/service/types`).then((response: AxiosResponse) => {
			setServiceData(response.data);
		});
	}, []);

	const Continue = (e: any) => {
		e.preventDefault();
		nextStep();
	};

	const Previous = (e: any) => {
		e.preventDefault();
		prevStep();
	};

	return (
		<Container component='main' maxWidth='xs'>
			<div>
				<form noValidate autoComplete='off'>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography component='h1' variant='h5'>
								Sign Up
							</Typography>
						</Grid>

						<Grid item xs={12}>
							<InputLabel id='simple-select-standard-label'>Vehicle Type</InputLabel>
							<Select
								id='vehicle_type'
								label='Vehicle Type'
								variant='standard'
								onChange={handleFormData('vehicletype.vehicle_type')}
								fullWidth
								required>
								{vehicleData.map((item) => (
									<MenuItem value={item.id}>{item.vehicle_type}</MenuItem>
								))}
							</Select>
						</Grid>

						<Grid item xs={12}>
							<InputLabel id='simple-select-standard-label'>Service Type</InputLabel>
							<Select
								id='service_type'
								label='Service Type'
								variant='standard'
								onChange={handleFormData('services.service_type')}
								fullWidth
								required>
								{serviceData.map((item) => (
									<MenuItem value={item.id}>{item.service_type}</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id='cost'
								label='Cost'
								placeholder='Cost'
								variant='outlined'
								defaultValue={values.services[0].cost}
								onChange={handleFormData('services.cost')}
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								onClick={Previous}
								type='submit'
								fullWidth
								variant='contained'
								color='primary'>
								Previous
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								onClick={Continue}
								type='submit'
								fullWidth
								variant='contained'
								color='primary'>
								Next
							</Button>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default FormDealerService;
