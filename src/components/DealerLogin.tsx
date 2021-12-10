import React, { useState } from 'react';
import { Button, Container, Grid, TextField, Link } from '@mui/material';
import { Modal } from 'react-bootstrap';
import { Typography } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { IDealerLogin } from '../Interfaces/IDealerLogin';
import { AxiosResponse } from 'axios';
import axios from '../BaseURL';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import '../css/dealerlogin.css';
import DealerDashboard from './DealerDashboard';
import { ISignedInDealer } from '../Interfaces/IDealerLogin';

const DealerLogin: React.FC<IDealerLogin> = () => {
	const initialState = {
		dealer_id: 0,
		name: '',
		mobile: '',
		gst_no: '',
		locality: '',
		city: '',
		state: '',
		pincode: '',
		email_ID: '',
		password: '',
		Vehicletype: {
			vehicle_type: ''
		}
	};

	// State variables
	const [state, setState] = useState<IDealerLogin>({ email: '', password: '' });

	const [loginStatus, setLoginStatus] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [msgStatus, setMsgStatus] = useState<string>('');
	const [showDashboard, setShowDashboard] = useState<boolean>(false);
	const [loggedInDealer, setLoggedInDealer] = useState<ISignedInDealer>(initialState);

	// Function to check Dealer Login credentials
	const checkLogin = () => {
		if (isValid) {
			console.log(`state: ${state}`);
			axios
				.get(`/dealer/checkLogin/${state.email}/${state.password}`)
				.then((response: AxiosResponse) => {
					if (response.data.message) {
						setMsgStatus('red');
						setLoginStatus(response.data.message);
					} else {
						if (response.data.dealer_id) {
							// console.log(response);
							setLoggedInDealer(response.data);
							// console.log(loggedInDealer);
							setShowDashboard(true);
							setMsgStatus('green');
							setLoginStatus('Login Successful!!!');
						}
					}
				});
		}
	};

	// Toggle Password Visibility
	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	const validationSchema: Yup.SchemaOf<IDealerLogin> = Yup.object().shape({
		email: Yup.string().required('Please enter your login email'),
		password: Yup.string().required('Please enter your password')
	});

	const handleChange = (input: string) => (e: any) => {
		const { value } = e.target;
		setState((prevState) => ({
			...prevState,
			[input]: value
		}));
	};

	const {
		register,
		formState: { errors, isValid }
	} = useForm<IDealerLogin>({
		mode: 'all',
		resolver: yupResolver(validationSchema)
	});

	const handleDashboard = () => {
		setShowDashboard(false);
	};

	return (
		<>
			<Container component='main' maxWidth='xs'>
				<div>
					<Grid container className='main' spacing={2}>
						{/* <Grid item className='item' xs={12}>
						<Avatar className='avatar'>
							<LockOutlinedIcon />
						</Avatar>
					</Grid> */}
						<Grid item className='item' xs={12}>
							<TextField
								id='email'
								type='email'
								label='Email'
								{...register('email')}
								variant='standard'
								placeholder='Please enter Email'
								onChange={handleChange('email')}
								fullWidth
								required
								error={errors.email ? true : false}
								helperText={errors.email ? errors.email.message : ' '}
							/>
						</Grid>
						<Grid item className='item' xs={12}>
							<TextField
								id='password'
								type={showPassword ? 'text' : 'password'}
								label='Password'
								{...register('password')}
								variant='standard'
								placeholder='Please enter Password'
								onChange={handleChange('password')}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												aria-label='toggle password visibility'
												onClick={handleTogglePassword}>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									)
								}}
								fullWidth
								required
								error={errors.email ? true : false}
								helperText={errors.password ? errors.password.message : ' '}
							/>
						</Grid>
						<Grid item className='item' xs={12}>
							<Button
								type='submit'
								onClick={checkLogin}
								variant='contained'
								fullWidth
								className='button'
								style={{
									color: 'white',
									backgroundColor: '#0275d8',
									borderRadius: '5px',
									height: '2.5rem'
								}}>
								Login
							</Button>
						</Grid>
						<Grid item className='item' xs={12}>
							<Typography>
								Not a Partner?{'  '}
								<Link underline='hover'>Sign Up</Link>
							</Typography>
						</Grid>

						<Grid item className='item' xs={12}>
							<Typography style={{ color: msgStatus === 'red' ? 'red' : 'green' }}>
								{loginStatus}
							</Typography>
						</Grid>
					</Grid>
				</div>
			</Container>
			<Modal
				fullscreen
				aria-labelledby='contained-modal-title-vcenter'
				centered
				show={showDashboard}
				onHide={handleDashboard}>
				<Modal.Header closeButton style={{ color: 'white', backgroundColor: '#0275d8' }}>
					Dealer Dashboard
				</Modal.Header>
				<Modal.Body>
					<div>
						<DealerDashboard show={showDashboard} loggedInDealer={loggedInDealer} />
						{/* {SelectedDealer ? <Booking SelectedDealer={SelectedDealer} serviceData={serviceData} handleClose={handleBooking} customerData={customerData} /> : null} */}
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default DealerLogin;
