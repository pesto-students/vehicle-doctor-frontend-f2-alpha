import React, { useState } from 'react';
import { Button, Container, Grid, TextField, Link } from '@mui/material';
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

const DealerLogin: React.FC<IDealerLogin> = () => {
	// State variables
	const [state, setState] = useState<IDealerLogin>({ email: '', password: '' });
	const [loginStatus, setLoginStatus] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [msgStatus, setMsgStatus] = useState<string>('');

	// Function to check Dealer Login credentials
	const checkLogin = () => {
		if (isValid) {
			axios
				.post('/dealer/checkLogin', {
					email: state.email,
					password: state.password
				})
				.then((response: AxiosResponse) => {
					if (response.data.message) {
						setMsgStatus('red');
						setLoginStatus(response.data.message);
					} else {
						if (response.data.dealer_id) {
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
		control,
		handleSubmit,
		formState: { errors, isValid }
	} = useForm<IDealerLogin>({
		mode: 'all',
		resolver: yupResolver(validationSchema)
	});

	return (
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
							className='button'>
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
	);
};

export default DealerLogin;
