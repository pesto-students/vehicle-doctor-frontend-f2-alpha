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
	Button,
	InputAdornment
} from '@mui/material';
import { PREVIOUS, NEXT, DEALER_SIGNUP_FORM_HEADER } from '../../Constants/common.constant';
import axios, { AxiosResponse } from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
	IDealerVehService,
	IServices,
	IVehicleType,
	IDealerServiceForm
} from '../../Interfaces/IDealerServiceType';

const FormDealerService: React.FC<IDealerVehService> = ({
	nextStep,
	prevStep,
	handleFormData,
	values
}) => {
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

	// Function to continue to next step of the form
	const Continue = (e: any) => {
		e.preventDefault();
		nextStep();
	};

	// Function to go back to previous step of form
	const Previous = (e: any) => {
		e.preventDefault();
		prevStep();
	};

	// Yup Validation schema for fields
	const validationSchema: Yup.SchemaOf<IDealerServiceForm> = Yup.object().shape({
		vehicletype: Yup.object().shape({
			vehicle_type: Yup.string().required('Please select a Vehicle Type')
		}),
		services: Yup.array().of(
			Yup.object().shape({
				service_type: Yup.string().required('Please select a Service Type'),
				service_name: Yup.string().required('Please select a Service Type'),
				cost: Yup.number().required('Please enter Service Cost')
			})
		)
	});

	//Resolve useForm hook with the validation schema declared above
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isValid }
	} = useForm<IDealerServiceForm>({
		mode: 'all',
		resolver: yupResolver(validationSchema)
	});

	return (
		<Container component='main' maxWidth='xs'>
			<div>
				<form noValidate autoComplete='off'>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography component='h1' variant='h5'>
								{DEALER_SIGNUP_FORM_HEADER}
							</Typography>
						</Grid>

						<Grid item xs={12}>
							<InputLabel id='simple-select-standard-label'>Vehicle Type</InputLabel>
							<Controller
								name='vehicletype'
								control={control}
								render={({ field }) => (
									<Select
										id='vehicle_type'
										label='Vehicle Type'
										variant='standard'
										{...field}
										name='vehicle_type'
										onChange={handleFormData('vehicletype.vehicle_type')}
										fullWidth
										required>
										{vehicleData.map((item) => (
											<MenuItem value={item.vehicletype.vehicle_type} key={item.vehicletype.id}>
												{item.vehicletype.vehicle_type}
											</MenuItem>
										))}
									</Select>
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={8}>
							<InputLabel id='simple-select-standard-label'>Service Type</InputLabel>
							<Controller
								name='services'
								control={control}
								render={({ field }) => (
									<Select
										id='service_type'
										label='Service Type'
										variant='standard'
										{...field}
										name='service_type'
										onChange={handleFormData('services.service_type')}
										fullWidth
										required>
										{serviceData.map((item) => (
											<MenuItem value={item.services[0].service_name} key={item.services[0].id}>
												{item.services[0].service_type} - {item.services[0].service_name}
											</MenuItem>
										))}
									</Select>
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								id='cost'
								label='Cost'
								{...register('services.0.cost')}
								name='cost'
								placeholder='Cost'
								variant='outlined'
								defaultValue={values.services[0].cost}
								onChange={handleFormData('services.cost')}
								// InputProps={{
								// 	startAdornment: <InputAdornment position='start'>₹</InputAdornment>,
								// }}
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
								color='secondary'>
								{PREVIOUS}
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								onClick={Continue}
								type='submit'
								fullWidth
								variant='contained'
								color='primary'>
								{NEXT}
							</Button>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default FormDealerService;
