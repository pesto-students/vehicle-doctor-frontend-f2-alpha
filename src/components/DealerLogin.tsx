import React, { useState } from 'react';
import { Button, Container, Grid, Link, TextField } from '@material-ui/core';
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
// import * as yup from 'yup';

const DealerLogin: React.FC<IDealerLogin> = () => {
	// State variables
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const [loginStatus, setLoginStatus] = useState<string>('');

	const [showPassword, setShowPassword] = useState<boolean>(false);

	// Function to check Dealer Login credentials
	const checkLogin = () => {
		axios
			.post('/dealer/checkLogin', {
				email,
				password
			})
			.then((response: AxiosResponse) => {
				if (response.data.message) {
					setLoginStatus(response.data.message);
				} else {
					if (response.data.dealer_id) {
						setLoginStatus('Login Successful!!!');
					}
				}
			});
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
			backgroundColor: '#03aba7'
		},
		item: {
			// display: 'flex',
			justifyItem: 'center',
			alignSelf: 'center',
			padding: 5
		}
	});

	const classes = useStyles();

	// const schema: yup.SchemaOf<IDealerLogin> = yup.object().shape({
	// 	email: yup.string().required('Email is required'),
	// 	password: yup.string().required('Password is required')
	// })

	// schema.validate()
	// .then(function(value){
	// 	console.log(value)
	// });

	return (
		<Container component='main' maxWidth='xs'>
			<div>
				<Grid container className={classes.main}>
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
							placeholder='Please enter Email'
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							required
							fullWidth
						/>
					</Grid>
					<Grid item className={classes.item} xs={12}>
						<TextField
							id='password'
							type={showPassword ? 'text' : 'password'}
							value={password}
							label='Password'
							placeholder='Please enter Password'
							onChange={(e) => {
								setPassword(e.target.value);
							}}
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
							required
							fullWidth
						/>
					</Grid>
					<Grid item className={classes.item} xs={12}>
						<Button
							type='submit'
							color='primary'
							onClick={checkLogin}
							variant='contained'
							fullWidth>
							Login
						</Button>
					</Grid>
					<Grid item className={classes.item} xs={12}>
						<Typography>
							Not a Partner?
							<Link href='#'>Sign up</Link>
						</Typography>
					</Grid>
					<Grid item className={classes.item}>
						<Typography>{loginStatus}</Typography>
					</Grid>
				</Grid>
			</div>
		</Container>
	);
};

export default DealerLogin;
