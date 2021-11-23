import React, { useState } from 'react';
import { Container, Grid, TextField, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { DealerSignup } from '../../Interfaces/DealerRegInterface';

interface Props {
	nextStep: Function;
	prevStep: Function;
	handleFormData: any;
	values: {
		gst_no: string;
		locality: string;
		city: string;
		state: string;
		pincode: string;
	};
}

const FormDealerDetails: React.FC<Props> = ({ nextStep, prevStep, handleFormData, values }) => {
	const [error, setError] = useState(false);

	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors }
	// } = useForm();

	const Continue = (e: any) => {
		e.preventDefault();
		nextStep();
	};

	const Previous = (e: any) => {
		e.preventDefault();
		prevStep();
	};
	return (
		<div>
			<Container sx={{ p: 2 }}>
				<form noValidate autoComplete='off'>
					<Grid container direction={'column'} spacing={2} rowSpacing={1}>
						<Grid item>
							<Typography variant='h5'>Enter your details below</Typography>
						</Grid>

						<Grid item>
							<TextField
								id='locality'
								label='Locality'
								placeholder='Locality'
								variant='outlined'
								defaultValue={values.locality}
								onChange={handleFormData('locality')}
								fullWidth
								required
							/>
						</Grid>
						<Grid item>
							<TextField
								id='city'
								label='City'
								placeholder='City'
								variant='outlined'
								defaultValue={values.city}
								onChange={handleFormData('city')}
								fullWidth
								required
							/>
						</Grid>
						<Grid item>
							<TextField
								id='state'
								label='State'
								placeholder='State'
								variant='outlined'
								defaultValue={values.state}
								onChange={handleFormData('state')}
								fullWidth
								required
							/>
						</Grid>
						<Grid item>
							<TextField
								id='pincode'
								label='Pin'
								placeholder='Pin'
								variant='outlined'
								defaultValue={values.pincode}
								onChange={handleFormData('pincode')}
								fullWidth
								required
							/>
						</Grid>

						<Grid item>
							<TextField
								id='gst_no'
								label='GST No'
								placeholder='GST No'
								variant='outlined'
								defaultValue={values.gst_no}
								onChange={handleFormData('gst_no')}
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								onClick={Previous}
								type='submit'
								variant='contained'
								fullWidth
								color='secondary'>
								Previous
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								onClick={Continue}
								type='submit'
								variant='contained'
								fullWidth
								color='primary'>
								Next
							</Button>
						</Grid>
					</Grid>
				</form>
			</Container>
		</div>
	);
};

export default FormDealerDetails;
