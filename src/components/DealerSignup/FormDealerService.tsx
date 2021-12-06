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
import {
	PREVIOUS,
	SUBMIT,
	DEALER_SIGNUP_FORM_HEADER,
	STEP_3
} from '../../Constants/common.constant';
import { AxiosResponse } from 'axios';
import axios from '../../BaseURL';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
	IDealerVehService,
	IServices,
	IVehicleType,
	IDealerServiceForm
} from '../../Interfaces/IDealerServiceType';
import '../../css/dealersignup.css';

const FormDealerService: React.FC<IDealerVehService> = ({
	nextStep,
	prevStep,
	handleFormData,
	values
}) => {
	const [vehicleData, setVehicleData] = useState<IVehicleType[]>([]);
	const [serviceData, setServiceData] = useState<IServices[]>([]);
	const [serviceType, setServiceType] = useState<number>(0);

	useEffect(() => {
		//Get vehicle data
		axios.get<[]>('/vehicle/types').then((response: AxiosResponse) => {
			setVehicleData(response.data);
		});
		//Get Service Type Data
		axios.get<[]>('/service/types').then((response: AxiosResponse) => {
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

	const handleSelect = (e: any) => {
		console.log(e.target.value);
		setServiceType(e.target.key);

		handleFormData('service_name');
	};

	// Yup Validation schema for fields
	// const validationSchema: Yup.SchemaOf<IDealerServiceForm> = Yup.object().shape({
	// 	vehicle_type: Yup.string().required('Please select a Vehicle Type'),
	// 	service_name: Yup.string().required('Please select a Service Type'),
	// 	service_type: Yup.number(),
	// 	cost: Yup.number().required('Please enter Service Cost')
	// });

	// // Resolve useForm hook with the validation schema declared above
	// const {
	// 	register,
	// 	control,
	// 	handleSubmit,
	// 	formState: { errors, isValid }
	// } = useForm<IDealerServiceForm>({
	// 	mode: 'all',
	// 	resolver: yupResolver(validationSchema)
	// });

	const onSubmit = (data: any) => {
		alert(JSON.stringify(data));
	};

	return (
		<Container component='main' maxWidth='xs'>
			<div>
				<form noValidate autoComplete='off'>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography component='h1' variant='h6' className='header'>
								{DEALER_SIGNUP_FORM_HEADER} - {STEP_3}
							</Typography>
						</Grid>

						<Grid item xs={12}>
							<InputLabel id='vehicle_type_label'>Vehicle Type</InputLabel>
							<Controller
								render={({ field }) => (
									<Select
										id='vehicle_type'
										label='Vehicle Type'
										variant='standard'
										// {...field}
										onChange={handleFormData('vehicle_type')}
										fullWidth
										required>
										{vehicleData.map((item) => (
											<MenuItem value={item.id} key={item.id}>
												{item.vehicle_type}
											</MenuItem>
										))}
									</Select>
								)}
								name='vehicle_type'
								// control={control}
							/>
						</Grid>
						<Grid item xs={12} sm={8}>
							<InputLabel id='service_type_label'>Service Type</InputLabel>
							<Controller
								render={({ field }) => (
									<Select
										id='service_type'
										label='Service Type'
										variant='standard'
										// {...field}
										onChange={handleSelect}
										fullWidth
										required>
										{serviceData.map((item) => (
											<MenuItem value={item.service_name} key={item.id}>
												{item.service_type} - {item.service_name}
											</MenuItem>
										))}
									</Select>
								)}
								name='service_name'
								// control={control}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								id='cost'
								label='Cost'
								// {...register('cost')}
								name='cost'
								placeholder='Cost'
								variant='outlined'
								defaultValue={values.cost}
								onChange={handleFormData('cost')}
								InputProps={{
									startAdornment: <InputAdornment position='start'>₹</InputAdornment>
								}}
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id='service_type'
								// {...register('service_type')}
								name='service_type'
								aria-describedby='service-type-text'
								value={serviceType}
								hidden
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
								// disabled={!isValid}
								color='primary'>
								{SUBMIT}
							</Button>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default FormDealerService;
