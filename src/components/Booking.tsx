import React, { useState, useRef } from 'react';
import { Button, Carousel, Modal } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Dealer } from '../Interfaces/IDealerInterface';
import { IBookingService } from '../Interfaces/IBookingServiceInterface';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import axios from '../BaseURL';
import { AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ICustomerDetails } from '../Interfaces/ICustomerDetails';
import ReactToPrint from 'react-to-print';
import Rating from '@mui/material/Rating';

type Props = {
	SelectedDealer: Dealer;
	serviceData: any;
	handleClose: (val: boolean) => void;
	customerData: ICustomerDetails | undefined;
	isHome: boolean | undefined;
};

const Booking: React.FC<Props> = ({ SelectedDealer, serviceData, handleClose, customerData, isHome }) => {
	const [pickupDateValue, setpickupdateValue] = React.useState<Date | null>(new Date());
	const [formData, setFormData] = useState<IBookingService>({
		refrence_id: '',
		vehicle_reg_no: '',
		vehicle_model: '',
		pick_up: 0,
		pick_up_date: new Date(),
		drop_date: new Date(),
		customer_id: 0,
		dealer_id: 0,
		service_id: 0,
		status_id: 0,
		vehicle_type_id: 0
	});
	const [summary, SetSummaryID] = useState<string>();
	const [showInvoice, setShowInvoice] = useState<boolean>(false);

	const printRef = useRef<HTMLDivElement>(null);

	const onSubmit = () => {
		// e.preventDefault();
		var value = Math.random().toString(36).substr(2, 6);
		formData.refrence_id = value.toUpperCase();
		formData.dealer_id = SelectedDealer.dealer_id;
		formData.status_id = 1;
		formData.service_id = serviceData.id;
		formData.customer_id = 1;
		formData.vehicle_type_id = SelectedDealer.vehicle_type_id;
		if (pickupDateValue != null) {
			console.log(value);
			formData.pick_up_date = pickupDateValue;
			formData.drop_date = addDays(pickupDateValue);
		}
		console.log('FormData', formData);
		axios.post('/order/Service/Booking', formData).then((response: AxiosResponse) => {
			SetSummaryID(response.data);
		});
		setShowInvoice(true);
	};

	function addDays(pick_up_date: Date) {
		var result = new Date(pick_up_date);
		result.setDate(result.getDate() + 7);
		return result;
	}

	const handleInput = (input: string) => (e: any) => {
		const { value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[input]: value
		}));
		console.log(formData);
	};

	//For Carousel
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex: any, e: any) => {
		setIndex(selectedIndex);
	};

	interface IFormInput {
		vName: string;
		vReg: string;
		cName: string;
		cMobile: string;
		cEmail: string;
		cLocality: string;
		cCity: string;
		cState: string;
	}

	//Unccomment from section 100 to 114, once you check the Booking Summary Modal, this is for validation

	// const schema = yup.object({
	//     vName: yup.string().required('Field is required.'),
	//     vReg: yup.string().required('Field is required.'),
	//     cName: yup.string().required('Field is required.'),
	//     cMobile: yup.string().required('Field is required.'),
	//     cLocality: yup.string().required('Field is required.'),
	//     cCity: yup.string().required('Field is required.'),
	//     cState: yup.string().required('Field is required.'),
	//     cEmail: yup.string().email('Must be a valid email').max(255).required('Email is required'),
	// }).required();

	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors }
	} = useForm<IFormInput>({
		// resolver: yupResolver(schema)
	});

	return (
		<>
			<div className='flex-container' style={{ alignItems: 'flex-start' }}>
				<div style={{ flex: '40%' }}>
					<div>
						<Carousel activeIndex={index} onSelect={handleSelect}>
							<Carousel.Item>
								<img
									className='d-block w-100'
									src='https://media.istockphoto.com/photos/this-bike-will-be-perfect-picture-id614415432?k=20&m=614415432&s=612x612&w=0&h=pxoABtoInMevUnC08h4rlbBVqc-5q1f4Pv4JW37SfAI='
									alt='First slide'
								/>
							</Carousel.Item>
							<Carousel.Item>
								<img
									className='d-block w-100'
									src='https://media.istockphoto.com/photos/mechanic-working-at-a-garage-and-wearing-a-facemask-picture-id1279375828?b=1&k=20&m=1279375828&s=170667a&w=0&h=ivHVSmEOVL6ujvW2OOZd_w1Uvbqap8PK11vfOb0ujUM='
									alt='Second slide'
								/>
							</Carousel.Item>
							<Carousel.Item>
								<img
									className='d-block w-100'
									src='https://hjfoxinsurance.com/wp-content/uploads/2016/03/iStock_000003465384Medium.76111338.jpg'
									alt='Third slide'
								/>
							</Carousel.Item>
						</Carousel>
					</div>
					<div style={{ padding: '5%', backgroundColor: 'white' }}>
						<table style={{ width: '100%' }}>
							<tbody>
								<tr>
									<td>
										{isHome ? <h3 style={{ textTransform: 'uppercase' }}>{serviceData.serviceTypes.service_name}</h3> :
											<h3 style={{ textTransform: 'uppercase' }}>{serviceData.serviceName}</h3>
										}
									</td>
									<td style={{ textAlign: 'right', color: 'orangered' }}>
										{isHome ? <h3>₹ {serviceData.cost}</h3> : SelectedDealer.Services.map((dataItem) => (
											<h3 key={dataItem.service_id}>₹ {dataItem.cost}</h3>
										))}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div style={{ flex: '40%', width: '100%', backgroundColor: 'white' }}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div style={{ width: '100%' }}>
							<div style={{ backgroundColor: 'rgb(2, 117, 216)', color: 'white', padding: '2%' }}>
								<h5>Book a Service</h5>
							</div>
							<div className='flex-container' style={{ border: '0.2px solid lightgrey' }}>
								<div className='modalBody'>
									<TextField
										id='input-with-icon-textfield'
										{...register('vName')}
										helperText={errors.vName?.message}
										label='Vehicle Model'
										variant='outlined'
										onChange={handleInput('vehicle_model')}
									/>
								</div>
								<div className='modalBody'>
									<TextField
										id='input-with-icon-textfield'
										label='Vehicle Reg No.'
										variant='outlined'
										onChange={handleInput('vehicle_reg_no')}
									/>
								</div>
								<div className='modalBody'>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<DateTimePicker
											renderInput={(params) => <TextField {...params} />}
											label='Pick Up Date/Time'
											value={pickupDateValue}
											onChange={(newValue) => {
												setpickupdateValue(newValue);
											}}
											minDateTime={new Date()}
										/>
									</LocalizationProvider>
								</div>
								<div className='modalBody'>
									<FormControl sx={{ m: 1, minWidth: 120 }}>
										<InputLabel id='demo-simple-select-standard-label'>Pick UP</InputLabel>
										<Select
											labelId='demo-simple-select-standard-label'
											id='demo-simple-select-standard'
											onChange={handleInput('pick_up')}
											autoWidth
											label='Age'>
											<MenuItem value={1}>YES</MenuItem>
											<MenuItem value={0}>NO</MenuItem>
										</Select>
									</FormControl>
								</div>
								<div style={{ textAlign: 'center' }}>
									<Button size='lg' variant='warning' type='submit'>
										Book Now
									</Button>
								</div>
							</div>
							<div className='flex-container' style={{ textAlign: 'center', width: '100%' }}>
								<div
									style={{
										backgroundColor: 'rgb(2, 117, 216)',
										color: 'white',
										padding: '2%',
										width: '100%'
									}}>
									<h5>Customer Details</h5>
								</div>
								<div
									style={{
										border: '0.2px solid lightgrey',
										width: '100%',
										padding: '5%',
										textAlign: 'left'
									}}>
									<h6>{customerData?.customer_name},</h6>
									<p>
										{customerData?.mobile}, {customerData?.email}
									</p>
									<p>{customerData?.customer_location.locality}, {customerData?.customer_location.city}, {customerData?.customer_location.state}, {customerData?.customer_location.pincode}.</p>
								</div>
							</div>

						</div>
					</form>
				</div>
			</div>
			<div
				className='flex-container'
				style={{ padding: '2%', alignItems: 'flex-start', backgroundColor: 'lightgrey' }}>
				<div>
					<ul style={{ listStyleType: 'none' }}>
						<li>
							<h4>Dealer Name</h4>
							<p>{SelectedDealer.name}</p>
						</li>
					</ul>
				</div>
				<div>
					<ul style={{ listStyleType: 'none' }}>
						<li>
							<h4>Reviews and Comments</h4>
							{SelectedDealer.dealer_history.map((dataItem) => (
								<ul style={{ listStyleType: 'none' }}>
									<li>
										<Rating name="size-small" size="small" value={dataItem.rating} readOnly /> - {dataItem.comments}
									</li>
								</ul>
							))}
						</li>
					</ul>
				</div>
				<div>
					<ul style={{ listStyleType: 'none' }}>
						<li>
							<h4>Service Description</h4>
							{isHome ? <p>{serviceData.discription}</p> :
								SelectedDealer.Services.map((dataItem) => (
									<p>{dataItem.discription}</p>
								))}
						</li>
					</ul>
				</div>
				<div>
					<ul style={{ listStyleType: 'none' }}>
						<li>
							<h4>Location Details</h4>
							<p>
								{SelectedDealer.locality}, {SelectedDealer.city}, {SelectedDealer.state}, IND. -{' '}
								{SelectedDealer.pincode}
							</p>
						</li>
					</ul>
				</div>
			</div>

			<Modal
				style={{ width: '100%' }}
				animation={true}
				show={showInvoice}
				onHide={() => setShowInvoice(!showInvoice)}
				backdrop='static'
				keyboard={false}>
				<Modal.Header closeButton style={{ color: 'white', backgroundColor: '#0275d8' }}>
					Booking Summary
				</Modal.Header>
				<Modal.Body>
					<div className='divModal' ref={printRef}>
						<h6>Dear Customer, your booking has been confirmed.</h6>
						<div style={{ border: '0.2px solid lightgrey', padding: '2%' }}>
							<div style={{ backgroundColor: 'rgb(2, 117, 216)', color: 'white', width: '100%' }}>
								<h5>Booking Details</h5>
							</div>
							<table width='100%' style={{ marginLeft: '5%' }}>
								<tr>
									<td>
										<h6>Booking ID</h6>
									</td>
									<td>
										<b>{formData.refrence_id}</b>
									</td>
								</tr>
								<tr>
									<td>
										<h6>Customer Name</h6>
									</td>
									<td>{customerData?.customer_name}</td>
								</tr>
								<tr>
									<td>
										<h6>Vehicle Model</h6>
									</td>
									<td>{formData.vehicle_model}</td>
								</tr>
								<tr>
									<td>
										<h6>Vehicle Reg No.</h6>
									</td>
									<td>{formData.vehicle_reg_no}</td>
								</tr>
								<tr>
									<td>
										<h6>Service</h6>
									</td>
									{isHome ? <td>{serviceData.serviceTypes.service_name}</td> :
										<td>{serviceData.serviceName}</td>
									}
								</tr>
							</table>
						</div>
						<div
							className='flex-container'
							style={{ border: '0.2px solid lightgrey', padding: '2%', width: '100%' }}>
							<div style={{ flex: '100%' }}>
								<div style={{ backgroundColor: 'rgb(2, 117, 216)', color: 'white', width: '100%' }}>
									<h5>Dealer Details</h5>
								</div>
								<p>
									<h6>{SelectedDealer.name},</h6> {SelectedDealer.mobile},{SelectedDealer.email},
									<br /> {SelectedDealer.locality}, {SelectedDealer.city}, {SelectedDealer.state},
									IND. - {SelectedDealer.pincode}
								</p>
							</div>
						</div>
						<table width='100%' style={{ border: '0.2px solid lightgrey', color: 'orangered' }}>
							<tr>
								<td>
									<h4>Total Cost paid (incl. GST)</h4>
								</td>
								<td>
									{isHome ? <h4>₹ {serviceData.cost}</h4> : SelectedDealer.Services.map((dataItem) => (
										<h4>₹ {dataItem.cost}</h4>
									))}
								</td>
							</tr>
						</table>

						<div style={{ textAlign: 'center', marginTop: '2%' }}>
							<ReactToPrint
								content={() => printRef.current as HTMLDivElement}
								trigger={() => (
									<input
										type='button'
										value='Print'
										style={{ color: 'white', backgroundColor: '#0275d8', width: '120px' }}
									/>
								)}
							/>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default Booking;
