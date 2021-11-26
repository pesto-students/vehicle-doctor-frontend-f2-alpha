import React from 'react';
import { Container, Grid, TextField, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { PREVIOUS, NEXT, DEALER_SIGNUP_FORM_HEADER } from '../../Constants/common.constant';
import { IDealerDetails, IDealerDetailForm } from '../../Interfaces/IDealerDetails';

const FormDealerDetails: React.FC<IDealerDetails> = ({
	nextStep,
	prevStep,
	handleFormData,
	values
}) => {
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

	//Regex for Pincode field
	const pinRegExp = /^[1-9][0-9]{5}$/;
	//Regex for GST Number field ~  Not implemented currently
	const gstNoRegExp = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;

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
			.max(15, 'GST Number should have 15 digits')
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
				<form noValidate autoComplete='off'>
					<Grid container spacing={2} rowSpacing={1}>
						<Grid item xs={12}>
							<Typography variant='h5'>{DEALER_SIGNUP_FORM_HEADER}</Typography>
						</Grid>

						<Grid item xs={12}>
							<TextField
								id='locality'
								label='Locality'
								{...register('locality')}
								name='locality'
								placeholder='Enter Locality'
								variant='outlined'
								defaultValue={values.locality}
								onChange={handleFormData('locality')}
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
								defaultValue={values.city}
								onChange={handleFormData('city')}
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
								defaultValue={values.state}
								onChange={handleFormData('state')}
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
								defaultValue={values.pincode}
								inputProps={{ maxLength: 6 }}
								onChange={handleFormData('pincode')}
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
								defaultValue={values.gst_no}
								inputProps={{ maxLength: 15 }}
								onChange={handleFormData('gst_no')}
								fullWidth
								required
								error={errors.gst_no ? true : false}
								helperText={errors.gst_no ? errors.gst_no.message : ' '}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button onClick={Previous} variant='contained' fullWidth color='secondary'>
								{PREVIOUS}
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								onClick={Continue}
								variant='contained'
								fullWidth
								color='primary'
								disabled={!isValid}>
								{NEXT}
							</Button>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default FormDealerDetails;
