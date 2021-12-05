import React, { ChangeEvent, useEffect, useState } from 'react';
import { TextField, Select, MenuItem, Button, Grid } from '@mui/material';
import { ISignedInDealer } from '../Interfaces/IDealerLogin';
import { IServices } from '../Interfaces/IDealerServiceType';
import { AxiosResponse } from 'axios';
import axios from '../BaseURL';
import { useForm } from 'react-hook-form';
import '../css/DealerService.css';

interface Props {
	loggedInDealer: ISignedInDealer;
	//Token: any;
}

interface IDealerService {
	service_id: number;
	discription: string;
	cost: number;
	serviceTypes: {
		service_type: string;
		service_name: string;
	};
}

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
	const [formData, setFormData] = useState<IFormInput>({
		dealerTblDealerId: loggedInDealer.dealer_id,
		service_type_id: 0,
		discription: '',
		cost: 0
	});

	useEffect(() => {
		if (renderTable) {
			axios
				.get<[]>(`/dealer/servicesByDealer/${loggedInDealer.dealer_id}`)
				.then((response: AxiosResponse) => {
					//console.log(response.data);
					setServiceData(response.data);
				});
		}

		setRenderTable(false);

		//Get Service Type Data
		axios.get<[]>('/service/types').then((response: AxiosResponse) => {
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
		console.log(formData);
	};

	// Add the data to the table
	const handleAddSubmit = (e: any) => {
		e.preventDefault();

		let body = JSON.stringify(formData);

		console.log(`formData Stringified: ${body}`);
		const config = {
			headers: {
				'Content-Type': 'application/JSON'
			}
		};

		axios.post('/dealer/addService', body, config).then((response: AxiosResponse) => {
			console.log(response.data);
			SetSummaryID(response.data);
			setRenderTable(true);
		});

		setFormData({
			dealerTblDealerId: loggedInDealer.dealer_id,
			service_type_id: 0,
			discription: '',
			cost: 0
		});
	};

	return (
		<div className='app-container'>
			<table className='data-table'>
				<thead>
					<tr>
						<th className='head-row'>Service Name</th>
						<th className='head-row'>Description</th>
						<th className='head-row'>Cost</th>
						<th className='head-row'>Action</th>
					</tr>
				</thead>
				<tbody>
					{serviceData.map((item) => (
						<tr key={item.service_id}>
							<td className='def-row'>{item.serviceTypes.service_name}</td>
							<td className='def-row'>{item.discription}</td>
							<td className='def-row'>{item.cost}</td>
							<td className='def-row' />
						</tr>
					))}
				</tbody>
			</table>
			<h5>Add a Service</h5>
			<form noValidate autoComplete='off' className='form-container' onSubmit={handleAddSubmit}>
				<Grid container spacing={2} style={{ height: '100px' }}>
					<Grid item xs={3}>
						<Select
							id='service_type_id'
							label='Service Type'
							defaultValue=''
							onChange={handleInput('service_type_id')}
							fullWidth
							required>
							{serviceType.map((item) => (
								<MenuItem value={item.id}>{item.service_name}</MenuItem>
							))}
						</Select>
					</Grid>

					<Grid item xs={3}>
						<TextField
							id='discription'
							name='discription'
							label='Description'
							placeholder='Description'
							variant='outlined'
							onChange={handleInput('discription')}
							fullWidth
							required
						/>
					</Grid>
					<Grid item xs={3}>
						<TextField
							id='cost'
							name='cost'
							label='Cost'
							placeholder='Cost'
							variant='outlined'
							onChange={handleInput('cost')}
							fullWidth
							required
						/>
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
				</Grid>
			</form>
		</div>
	);
};

export default DealerServices;
