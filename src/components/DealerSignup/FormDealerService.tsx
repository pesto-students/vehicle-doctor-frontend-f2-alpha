import React, { useState, useEffect } from 'react';
import {
	Container,
	Grid,
	TextField,
	InputLabel,
	Select,
	MenuItem,
	Typography,
	Button,
	InputAdornment,
	FormControl
} from '@mui/material';
import {
	PREVIOUS,
	SUBMIT,
	DEALER_SIGNUP_FORM_HEADER,
	STEP_3
} from '../../Constants/common.constant';
import { AxiosResponse } from 'axios';
import axios from '../../BaseURL';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
import { IServices, IVehicleType } from '../../Interfaces/IDealerServiceType';
import { IDealerSignup } from '../../Interfaces/IDealerRegistration';
import '../../css/dealersignup.css';

type Props = {
	nextStep: () => void;
	prevStep: () => void;
	setFormData: (input: any) => void;
	formData: IDealerSignup;
};

// type IDealerServiceForm = {
// 	vehicleTypeId: number;
// 	services: [
// 		{
// 			serviceTypeId: number;
// 			discription: string;
// 			cost: number;
// 		}
// 	];
// };

const FormDealerService: React.FC<Props> = ({ prevStep, setFormData, formData }) => {
	const [vehicleData, setVehicleData] = useState<IVehicleType[]>([]);
	const [serviceData, setServiceData] = useState<IServices[]>([]);

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

	// Function to go back to previous step of form
	const Previous = (e: any) => {
		e.preventDefault();
		prevStep();
	};

	// const handleSelect = (e: any) => {
	// 	console.log(e.target.value);
	// 	setServiceType(e.target.key);

	// 	handleFormData('service_name');
	// };

	// Yup Validation schema for fields
	// const validationSchema: Yup.SchemaOf<IDealerServiceForm> = Yup.object().shape({
	// 	vehicle_type: Yup.string().required('Please select a Vehicle Type'),
	// 	service_name: Yup.string().required('Please select a Service Type'),
	// 	service_type: Yup.number(),
	// 	cost: Yup.number().required('Please enter Service Cost')
	// });

	// Resolve useForm hook with the validation schema declared above
	const { register } = useForm<IDealerSignup>({
		mode: 'all'
		// resolver: yupResolver(validationSchema)
	});

	// const onSubmit: SubmitHandler<IDealerSignup> = () => {
	// console.log('formData submit', lFormData);
	// lFormData.name = name;
	// let body = JSON.stringify(
	// 	name +
	// 		locality +
	// 		city +
	// 		state +
	// 		pincode +
	// 		mobile +
	// 		gst_no +
	// 		email +
	// 		password +
	// 		vehicle_type_id
	// );
	// setFormData({
	// 	name: name,
	// 	locality: locality,
	// 	city: city,
	// 	state: state,
	// 	pincode: pincode,
	// 	mobile: mobile,
	// 	gst_no: gst_no,
	// 	email: email,
	// 	password: password,
	// 	confirm_password: password,
	// 	vehicle_type_id: vehicle_type_id,
	// 	services: [
	// 		{
	// 			service_type_id: values.services[0]?.service_type_id,
	// 			discription: values.services[0]?.discription,
	// 			cost: values.services[0]?.cost
	// 		}
	// 	]
	// });
	// let body = JSON.stringify(lFormData);
	// alert(`formData Stringified: ${body}`);
	// const config = {
	// 	headers: {
	// 		'Content-Type': 'application/JSON'
	// 	}
	// };
	// axios.post('/dealer/addDealer', body, config).then((response: AxiosResponse) => {
	// 	console.log(response.data);
	// });
	// };

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

						<Grid item xs={12} sm={12}>
							<FormControl sx={{ m: 1, minWidth: 100 }}>
								<InputLabel id='vehicle_type_label'>Vehicle Type</InputLabel>
								<Select
									id='vehicle_type'
									labelId='vehicle_type_label'
									{...register('vehicle_type_id')}
									variant='standard'
									onChange={(event) =>
										setFormData({ ...formData, vehicle_type_id: Number(event.target.value) })
									}
									fullWidth
									required>
									{vehicleData.map((item) => (
										<MenuItem value={item.id} key={item.id}>
											{item.vehicle_type}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						{/* <Grid item xs={12} sm={12}>
							<FormControl sx={{ m: 1, minWidth: 150 }}>
								<InputLabel id='service_type_label'>Service Type</InputLabel>
								<Controller
									name='services.0.serviceTypeId'
									control={control}
									render={({ field: { onChange, value } }) => (
										<Select
											id='service_type'
											label='Service Type'
											variant='standard'
											value='serviceTypeId'
											onChange={(event) =>
												setFormData({ ...formData, serviceTypeId: event.target.value })
											}
											fullWidth
											required>
											{serviceData.map((item) => (
												<MenuItem value={item.id} key={item.id}>
													{item.service_name}
												</MenuItem>
											))}
										</Select>
									)}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={8}>
							<TextField
								id='discription'
								label='Description'
								{...register('services.0.discription')}
								name='discription'
								placeholder='Enter Description'
								variant='outlined'
								value={formData.services[0].discription}
								onChange={(event) => setFormData({ ...formData, discription: event.target.value })}
								fullWidth
								required
								// error={errors.discription ? true : false}
								// helperText={errors.discription ? errors.discription.message : ' '}
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
								value={formData.services[0].cost}
								onChange={(event) => setFormData({ ...formData, cost: event.target.value })}
								InputProps={{
									startAdornment: <InputAdornment position='start'>₹</InputAdornment>
								}}
								fullWidth
								required
							/>
						</Grid> */}
						{/* <Grid item xs={12}>
							<TextField
								id='service_type'
								// {...register('service_type')}
								name='service_type'
								aria-describedby='service-type-text'
								value={serviceType}
								hidden
							/>
						</Grid> */}
						<Grid item xs={12} sm={6}>
							<Button onClick={Previous} variant='contained' fullWidth color='secondary'>
								{PREVIOUS}
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
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
