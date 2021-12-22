import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { DEALER_LOGIN_MODAL_HEADER,GuestLogin } from '../../Constants/common.constant';
import '../../css/dealerlogin.css';
import { Button, Container, Grid, TextField } from '@mui/material';
import { Typography } from '@mui/material';
import IconButton from '@material-ui/core/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { IDealerLogin, ISignedInDealer } from '../../Interfaces/IDealerLogin';
import { AxiosResponse } from 'axios';
import axios from '../../BaseURL';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import DealerDashboard from '../DealerDashboard';
import { blue } from '@mui/material/colors';
import logo from '../../img/logo.jpg';



type Props = {
	open: boolean;
	handleClose: (val: boolean) => void;
};

const DealerLoginModal: React.FC<Props> = ({ open, handleClose }) => {
	const initialState = {
		dealer_id: 0,
		name: '',
		mobile: '',
		gst_no: '',
		locality: '',
		city: '',
		state: '',
		pincode: '',
		email: '',
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

			axios
				.get(`/dealer/checkLogin/${state.email}/${state.password}`)
				.then((response: AxiosResponse) => {
					if (response.data.message) {
						setMsgStatus('red');
						setLoginStatus(response.data.message);
					} else {
						if (response.data.dealer_id) {
							setLoggedInDealer(response.data);

							setShowDashboard(true);
							handleClose(false);
						}
					}
				});
		}
	};

	const testLogin = () => {
		state.email='test@gmail.com';
		state.password='Singh@123';
			axios
				.get(`/dealer/checkLogin/${state.email}/${state.password}`)
				.then((response: AxiosResponse) => {
					if (response.data.message) {
						setMsgStatus('red');
						setLoginStatus(response.data.message);
					} else {
						if (response.data.dealer_id) {
							setLoggedInDealer(response.data);

							setShowDashboard(true);
							handleClose(false);
						}
					}
				});
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
				<Modal
					aria-labelledby='contained-modal-title-vcenter'
					centered
					backdrop='static'
					keyboard={false}
					contentClassName='modal20w'
					show={open}
					onHide={handleClose}>
					<Modal.Header closeButton style={{ color: 'white', backgroundColor: '#0d6efd' }}>
						{DEALER_LOGIN_MODAL_HEADER}
					</Modal.Header>
					<Modal.Body>
						<div className='divModal'>
							<Grid container className='main' spacing={2}>
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
									<Button
										type='submit'
										onClick={testLogin}
										variant='contained'
										fullWidth
										className='button'
										style={{
											color: 'white',
											backgroundColor: '#0275d8',
											borderRadius: '5px',
											height: '2.5rem'
										}}>
										{GuestLogin}
									</Button>
								</Grid>
								<Grid item className='item' xs={12}>
									<Typography style={{ color: msgStatus === 'red' ? 'red' : 'green' }}>
										{loginStatus}
									</Typography>
								</Grid>
							</Grid>
						</div>
					</Modal.Body>
					<Modal.Footer>
					</Modal.Footer>
				</Modal>
			</Container>
			<Modal
				fullscreen
				aria-labelledby='contained-modal-title-vcenter'
				centered
				show={showDashboard}
				onHide={handleDashboard}>
				<Modal.Header style={{ color: 'white', backgroundColor: '#0275d8' }}>
				<div><img src={logo} width='30px' className='d-inline-block align-top' alt='logo' /><b>VehicleDr.com</b></div>    
				<span style={{fontSize:30}}>Dealer Dashboard</span>
					<Button
						variant='outlined'
						color='secondary'
						onClick={handleDashboard}>
					</Button>
					<IconButton color='secondary' onClick={handleDashboard}>
						<LogoutIcon fontSize='medium' sx={{ color: blue[50] }} />
					</IconButton>
				</Modal.Header>
				<Modal.Body>
					<div>
						<DealerDashboard show={showDashboard} loggedInDealer={loggedInDealer} />
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default DealerLoginModal;
