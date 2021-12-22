import React, { useEffect, useState } from 'react';
import { TextField, Select, MenuItem, Button, Grid, FormControl, InputLabel } from '@mui/material';
import { ISignedInDealer, IDealerService } from '../Interfaces/IDealerLogin';
import { IServices } from '../Interfaces/IDealerServiceType';
import Box from '@mui/material/Box';
import { AxiosResponse } from 'axios';
import axios from '../BaseURL';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import '../css/DealerService.css';
import CircularProgress from '@mui/material/CircularProgress';

// import AddServiceReadOnlyRow from '../components/Dealer/AddServiceReadOnlyRow';

type Props = {
	loggedInDealer: ISignedInDealer;
	//Token: any;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 2.5 + ITEM_PADDING_TOP,
			width: 200,
			padding: 8
		}
	}
};

interface IFormInput {
	dealerTblDealerId: number;
	service_type_id: number;
	discription: string;
	cost: number;
}

const DealerServices: React.FC<Props> = ({ loggedInDealer }) => {
	const [serviceType, setServiceType] = useState<IServices[]>([]);
	const [serviceData, setServiceData] = useState<IDealerService[]>([]);
	const [renderTable, setRenderTable] = useState<boolean>(true);
	const [summary, SetSummaryID] = useState<string>();
	const [msgStatus, setMsgStatus] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = React.useState<boolean>();

	const [formData, setFormData] = useState<IFormInput>({
		dealerTblDealerId: loggedInDealer.dealer_id,
		service_type_id: 0,
		discription: '',
		cost: 0
	});

	useEffect(() => {
		setLoading(false);
		if (renderTable) {
			axios
				.get<[]>(`/dealer/servicesByDealer/${loggedInDealer.dealer_id}`)
				.then((response: AxiosResponse) => {
					setLoading(true);
					setServiceData(response.data);
				});
		}

		setRenderTable(false);

		//Get Service Type Data
		axios.get<[]>('/service/types').then((response: AxiosResponse) => {
			setLoading(true);
			setServiceType(response.data);
		});
	}, [loggedInDealer.dealer_id, renderTable]);

	// Handle Input Data on value change
	const handleInput = (input: string) => (e: any) => {
		const { value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[input]: value
		}));

		SetSummaryID('');
	};

	// Add the data to the table
	const handleAddSubmit: SubmitHandler<IFormInput> = (data) => {
		let body = JSON.stringify(formData);
		setLoading(false);

		// console.log(`formData Stringified: ${body}`);
		const config = {
			headers: {
				'Content-Type': 'application/JSON'
			}
		};

		axios.post('/dealer/addService', body, config).then((response: AxiosResponse) => {
			if (response.data === 'Dealer service already exists') {
				setMsgStatus(true);
				SetSummaryID(JSON.stringify(response.data));
			}
			setLoading(true);
			setRenderTable(true);
			//Re-initialize state
			setFormData({
				dealerTblDealerId: loggedInDealer.dealer_id,
				service_type_id: 0,
				discription: '',
				cost: 0
			});
		}).catch((error) => {
			setLoading(true)
			console.log(error);
			setError(true)
		});;
	};

	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<IFormInput>({
		// resolver: yupResolver(schema)
	});

	return (
		<div className='app-container'>
			<h5>Add a Service</h5>
			
			<form
				noValidate
				autoComplete='off'
				className='form-container'
				onSubmit={handleSubmit(handleAddSubmit)}>
				<Grid container spacing={2}>
					<Grid item xs={2} style={{ height: 'auto', overflow: 'auto' }}>
						<FormControl>
							<InputLabel id='service_type_label'>Service Type</InputLabel>
							<Controller
								name='service_type_id'
								control={control}
								render={({ field }) => (
									<Select
										id='service_type_id'
										labelId='service_type_label'
										variant='standard'
										defaultValue={1}
										{...field}
										onChange={handleInput('service_type_id')}
										fullWidth
										required
										MenuProps={MenuProps}>
										{serviceType.map((item) => (
											<MenuItem value={item.id}>{item.service_name}</MenuItem>
										))}
									</Select>
								)}
							/>
						</FormControl>
					</Grid>

					<Grid item xs={4}>
						<TextField
							id='discription'
							label='Description'
							placeholder='Description'
							variant='standard'
							{...register('discription', { required: true })}
							onChange={handleInput('discription')}
							value={formData.discription}
							fullWidth
							required
						/>
						{errors.discription && <p className='text-error'>Description is required</p>}
					</Grid>
					<Grid item xs={3}>
						<TextField
							id='cost'
							type='number'
							label='Cost'
							placeholder='Cost'
							variant='standard'
							{...register('cost', { required: true })}
							onChange={handleInput('cost')}
							value={formData.cost}
							fullWidth
							required
						/>
						{errors.cost && <p className='text-error'>Cost is required</p>}
					</Grid>
					<Grid item xs={3}>
						<Button
							type='submit'
							variant='contained'
							fullWidth
							style={{
								color: 'white',
								backgroundColor: '#0275d8',
								borderRadius: '5px',
								height: '3rem'
							}}>
							Add
						</Button>
					</Grid>
					<Grid item className='item' xs={12}>
						<h6 style={{ color: msgStatus ? 'red' : 'none', textAlign: 'center' }}>{summary}</h6>
					</Grid>
				</Grid>
			</form>
			<div>
			{error === true ? <p style={{textAlign: 'center', color: "#d32f2f" }}>Please retry after sometime or change the service Type</p> : null}
			</div>
			{loading ? null : (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress />
				</Box>
			)}
			<table className='data-table'>
				<thead>
					<tr>
						<th className='head-row'>Service Name</th>
						<th className='head-row'>Description</th>
						<th className='head-row'>Cost</th>
					</tr>
				</thead>
				<tbody>
					{serviceData.map((item) => (
						<tr key={item.service_id}>
							<td className='def-row'>{item.serviceTypes.service_name}</td>
							<td className='def-row'>{item.discription}</td>
							<td className='def-row'>{item.cost}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default DealerServices;
