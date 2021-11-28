import React, { useState } from 'react';
import { Button, Container, Grid, Link, TextField } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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

const DealerLogin: React.FC<IDealerLogin> = () => {
	// State variables
	const [state, setState] = useState<IDealerLogin>({ email: '', password: '' });
	// const [email, setEmail] = useState<string>('');
	// const [password, setPassword] = useState<string>('');
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

	// Styles applied to fields
	const useStyles = makeStyles({
		container: {
			border: 0
		},
		main: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center'
		},
		avatar: {
			backgroundColor: '#0d6efd'
		},
		item: {
			// display: 'flex',
			justifyItem: 'center',
			alignSelf: 'center',
			padding: 5
		},
		status: {
			color: msgStatus
		},
		button: {
			backgroundColor: '#0d6efd',
			color: '#ffffff',
			'&:hover': {
				backgroundColor: '#0b5ed7'
			},
			action: {
				disabledBackground: '#0b5ed7',
				disabled: '#ffffff'
			}
		},
		link: {
			color: '#0d6efd'
		}
	});

	const classes = useStyles();

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
				<Grid container className={classes.main} spacing={2}>
					<Grid item className={classes.item} xs={12}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
					</Grid>
					<Grid item className={classes.item} xs={12}>
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
					<Grid item className={classes.item} xs={12}>
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
					<Grid item className={classes.item} xs={12}>
						<Button
							type='submit'
							onClick={checkLogin}
							variant='contained'
							fullWidth
							className={classes.button}>
							Login
						</Button>
					</Grid>
					<Grid item className={classes.item} xs={12}>
						<Typography>
							Not a Partner?{'  '}
							<Link href='#' className={classes.link}>
								Sign up
							</Link>
						</Typography>
					</Grid>

					<Grid item className={classes.item} xs={12}>
						<Typography className={classes.status}>{loginStatus}</Typography>
					</Grid>
				</Grid>
			</div>
		</Container>
	);
};

export default DealerLogin;
