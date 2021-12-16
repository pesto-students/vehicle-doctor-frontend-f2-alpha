import React from 'react';
import { Container, Grid, TextField, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { NEXT, DEALER_SIGNUP_FORM_HEADER, STEP_1 } from '../../Constants/common.constant';
import { IDealerCredForm } from '../../Interfaces/IDealerCredentials';
import '../../css/dealersignup.css';
import { IDealerSignup } from '../../Interfaces/IDealerRegistration';

type Props = {
	nextStep: () => void;
	setFormData: (input: any) => void;
	formData: IDealerSignup;
};

const FormDealerCredentials: React.FC<Props> = ({ nextStep, formData, setFormData }) => {
	//Regex for Mobile No field
	const phoneRegExp = /^[1-9][0-9]{9}$/;
	const nameRegExp = /^[a-zA-Z]+\s?[a-zA-Z]+\s?[a-zA-Z]+$/i;

	// Function to continue to next step of the form
	const Continue = (e: any) => {
		e.preventDefault();
		// console.log('formData', formData);
		nextStep();
	};

	// Yup Validation schema for fields
	const validationSchema: Yup.SchemaOf<IDealerCredForm> = Yup.object().shape({
		name: Yup.string()
			.matches(nameRegExp, 'Name is invalid')
			.typeError('Name must have only alphabets')
			.required('Please enter the Name'),
		mobile: Yup.string()
			.matches(phoneRegExp, 'Mobile Number is invalid')
			.typeError('Mobile must be a 10-Digit number')
			.required('Please enter 10-Digit Mobile Number')
			.min(10, 'Mobile Number should have 10 digits')
			.max(12, 'Mobile Number should have 10 digits'),
		email: Yup.string().required('Please enter the Email').email('Email is invalid'),
		password: Yup.string()
			.required('Password is required')
			.min(6, 'Password must be at least 6 characters')
			.max(20, 'Password must not exceed 20 characters'),
		confirmPassword: Yup.string()
			.required('Confirm Password is required')
			.oneOf([Yup.ref('password'), null], 'Confirm Password does not match')
	});

	//Resolve useForm hook with the validation schema declared above
	const {
		register,
		formState: { errors, isValid }
	} = useForm<IDealerCredForm>({
		mode: 'all',
		resolver: yupResolver(validationSchema)
	});

	return (
		<div>
			<Container sx={{ p: 1 }}>
				<form noValidate autoComplete='off'>
					<Grid direction={'column'} container spacing={2} rowSpacing={1}>
						<Grid item>
							<Typography variant='h6' className='header'>
								{DEALER_SIGNUP_FORM_HEADER} - {STEP_1}
							</Typography>
						</Grid>
						{/* <Grid item>
							<Typography variant='h6' className='header'>
								Step 1
							</Typography>
						</Grid> */}
						<Grid item>
							<TextField
								id='name'
								label='Name'
								{...register('name')}
								name='name'
								placeholder='Enter Name'
								variant='outlined'
								value={formData.name}
								onChange={(event) => setFormData({ ...formData, name: event.target.value })}
								fullWidth
								required
								error={errors.name ? true : false}
								helperText={errors.name ? errors.name.message : ' '}
							/>
						</Grid>
						<Grid item>
							<TextField
								id='mobile'
								label='Mobile'
								type='number'
								{...register('mobile')}
								name='mobile'
								placeholder='Enter 10-digit Mobile Number'
								variant='outlined'
								value={formData.mobile}
								inputProps={{ maxLength: 10 }}
								onChange={(event) => setFormData({ ...formData, mobile: event.target.value })}
								fullWidth
								required
								error={errors.mobile ? true : false}
								helperText={errors.mobile ? errors.mobile.message : ' '}
							/>
						</Grid>
						<Grid item>
							<TextField
								id='email'
								type='email'
								label='Email ID'
								{...register('email')}
								name='email'
								placeholder='Enter Email'
								variant='outlined'
								value={formData.email}
								onChange={(event) => setFormData({ ...formData, email: event.target.value })}
								fullWidth
								required
								error={errors.email ? true : false}
								helperText={errors.email ? errors.email.message : ' '}
							/>
						</Grid>
						<Grid item>
							<TextField
								id='password'
								type='password'
								label='Password'
								{...register('password')}
								name='password'
								placeholder='Password'
								variant='outlined'
								value={formData.password}
								onChange={(event) => setFormData({ ...formData, password: event.target.value })}
								fullWidth
								required
								error={errors.password ? true : false}
								helperText={errors.password ? errors.password.message : ' '}
							/>
						</Grid>
						<Grid item>
							<TextField
								id='confirmPassword'
								type='password'
								label='Confirm Password'
								{...register('confirmPassword')}
								name='confirmPassword'
								placeholder='Confirm Password'
								variant='outlined'
								value={formData.confirmPassword}
								onChange={(event) =>
									setFormData({ ...formData, confirmPassword: event.target.value })
								}
								fullWidth
								required
								error={errors.confirmPassword ? true : false}
								helperText={errors.confirmPassword ? errors.confirmPassword.message : ' '}
							/>
						</Grid>

						<Grid item>
							<Button
								variant='contained'
								fullWidth
								color='primary'
								onClick={Continue}
								disabled={!isValid}>
								{NEXT}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Container>
		</div>
	);
};

export default FormDealerCredentials;
