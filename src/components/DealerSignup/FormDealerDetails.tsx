import React, { useEffect, useState } from 'react';
import {
	Container,
	Grid,
	TextField,
	Typography,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AxiosResponse } from 'axios';
import axios from '../../BaseURL';
import {
	PREVIOUS,
	DEALER_SIGNUP_FORM_HEADER,
	STEP_2,
	SUBMIT
} from '../../Constants/common.constant';
import { IDealerDetailForm } from '../../Interfaces/IDealerDetails';
import '../../css/dealersignup.css';
import { IDealerSignup } from '../../Interfaces/IDealerRegistration';
import { IVehicleType } from '../../Interfaces/IDealerServiceType';
import useGeoLocation from '../../Hooks/GeolocationHook';

type Props = {
	nextStep: () => void;
	prevStep: () => void;
	setFormData: (input: any) => void;
	formData: IDealerSignup;
};

const FormDealerDetails: React.FC<Props> = ({ nextStep, prevStep, setFormData, formData }) => {
	const [vehicleData, setVehicleData] = useState<IVehicleType[]>([]);
	const location = useGeoLocation();

	

	useEffect(() => {
		//Get vehicle data
		axios.get<[]>('/vehicle/types').then((response: AxiosResponse) => {
			setVehicleData(response.data);
		});
	}, []);

	const onSubmit: SubmitHandler<IDealerSignup> = () => {
		//Set Latitude & longitude ~ values will be later picked up from geo
		formData.lat = 100;
		formData.lng = 999;

		let body = JSON.stringify(formData);

		// Set config for post message
		const config = {
			headers: {
				'Content-Type': 'application/JSON'
			}
		};
		// Call the API to post Dealer Data
		axios.post('/dealer/addDealer', body, config).then((response: AxiosResponse) => {
			// console.log(response.data);
			nextStep();
		});
	};

	// Function to go back to previous step of form
	const Previous = (e: any) => {
		e.preventDefault();
		prevStep();
	};

	//Regex for Pincode field
	const pinRegExp = /^[1-9][0-9]{5}$/;
	//Regex for GST Number field ~  Not implemented currently
	// const gstNoRegExp = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;

	// Yup Validation schema for fields
	const validationSchema: Yup.SchemaOf<IDealerDetailForm> = Yup.object().shape({
		locality: Yup.string().required('Please enter the locality'),
		city: Yup.string().required('Please enter the city'),
		state: Yup.string().required('Please enter the state'),
		pincode: Yup.string()
			.required('Please enter the Pin')
			.matches(pinRegExp, 'Pin must be a 6-Digit number')
			.min(0, 'Pin should have 6 digits')
			.max(6, 'Pin should have 6 digits'),
		gst_no: Yup.string()
			.required('Please enter the GST Number')
			.min(0, 'GST Number should have 15 digits')
			.max(15, 'GST Number should have 15 digits'),
		vehicle_type_id: Yup.number().required('Please select a Vehicle Type')
	});

	//Resolve useForm hook with the validation schema declared above
	const {
		register,
		handleSubmit,
		formState: { errors, isValid }
	} = useForm<IDealerDetailForm>({
		mode: 'all',
		resolver: yupResolver(validationSchema)
	});

	return (
		<Container component='main' maxWidth='xs'>
			<div>
				<form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2} rowSpacing={1}>
						<Grid item xs={12}>
							<Typography variant='h6' className='header'>
								{DEALER_SIGNUP_FORM_HEADER} - {STEP_2}
							</Typography>
						</Grid>

						<Grid item xs={12}>
							<TextField
								id='locality'
								label='Locality'
								{...register('locality')}
								name='locality'
								placeholder='Enter Locality'
								variant='outlined'
								value={formData.locality}
								onChange={(event) => setFormData({ ...formData, locality: event.target.value })}
								fullWidth
								required
								error={errors.locality ? true : false}
								helperText={errors.locality ? errors.locality.message : ' '}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id='city'
								label='City'
								{...register('city')}
								name='city'
								placeholder='Enter City'
								variant='outlined'
								value={formData.city}
								onChange={(event) => setFormData({ ...formData, city: event.target.value })}
								fullWidth
								required
								error={errors.city ? true : false}
								helperText={errors.city ? errors.city.message : ' '}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id='state'
								label='State'
								{...register('state')}
								name='state'
								placeholder='Enter State'
								variant='outlined'
								value={formData.state}
								onChange={(event) => setFormData({ ...formData, state: event.target.value })}
								fullWidth
								required
								error={errors.state ? true : false}
								helperText={errors.state ? errors.state.message : ' '}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id='pincode'
								label='Pin'
								type='number'
								{...register('pincode')}
								name='pincode'
								placeholder='Enter Pin'
								variant='outlined'
								value={formData.pincode}
								inputProps={{ maxLength: 6 }}
								onChange={(event) => setFormData({ ...formData, pincode: event.target.value })}
								fullWidth
								required
								error={errors.pincode ? true : false}
								helperText={errors.pincode ? errors.pincode.message : ' '}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								id='gst_no'
								label='GST No'
								{...register('gst_no')}
								name='gst_no'
								placeholder='Enter GST Number'
								variant='outlined'
								value={formData.gst_no}
								inputProps={{ maxLength: 15 }}
								onChange={(event) => setFormData({ ...formData, gst_no: event.target.value })}
								fullWidth
								required
								error={errors.gst_no ? true : false}
								helperText={errors.gst_no ? errors.gst_no.message : ' '}
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<FormControl sx={{ m: 1, minWidth: 100 }}>
								<InputLabel id='vehicle_type_label'>Vehicle Type</InputLabel>
								<Select
									{...register('vehicle_type_id')}
									id='vehicle_type'
									labelId='vehicle_type_label'
									variant='standard'
									onChange={(event) =>
										setFormData({ ...formData, vehicle_type_id: event.target.value })
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

						<Grid item xs={12} sm={6}>
							<Button onClick={Previous} variant='contained' fullWidth color='secondary'>
								{PREVIOUS}
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								type='submit'
								variant='contained'
								fullWidth
								color='primary'
								// disabled={!isValid}
							>
								{SUBMIT}
							</Button>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default FormDealerDetails;
