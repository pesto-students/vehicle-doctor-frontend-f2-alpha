import React, { useState } from 'react';
import { Container, Grid, TextField, Typography, Button } from '@mui/material';
import { DealerSignup } from '../Interfaces/DealerRegInterface';
import FormDealerCredentials from './DealerSignup/FormDealerCredentials';
import FormDealerDetails from './DealerSignup/FormDealerDetails';
import FormDealerService from './DealerSignup/FormDealerService';
import Success from './DealerSignup/Success';

const DealerReg: React.FC = () => {
	const [step, setStep] = useState<number>(1);
	// const [name, setName] = useState<string>('');
	// const [locality, setLocality] = useState<string>('');
	// const [city, setCity] = useState<string>('');
	// const [dlrState, setDlrState] = useState<string>('');
	// const [pincode, setpincode] = useState<string>('');
	// const [mobile, setMobile] = useState<string>('');
	// const [email, setEmail] = useState<string>('');
	// const [password, setPassword] = useState<string>('');
	const [formData, setFormData] = useState<DealerSignup>({
		name: '',
		locality: '',
		city: '',
		state: '',
		pincode: '',
		mobile: '',
		gst_no: '',
		email_ID: '',
		password: '',
		confirm_password: '',
		vehicletype: {
			vehicle_type: ''
		},
		services: [
			{
				service_type: '',
				cost: 0
			}
		]
	});

	//Function to go to next step
	const nextStep = () => {
		setStep(step + 1);
	};

	//Function to go to previous step
	const prevStep = () => {
		setStep(step - 1);
	};

	//Handle Form Data input
	const handleInput = (input: string) => (e: any) => {
		const { value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[input]: value
		}));
	};

	switch (step) {
		case 1:
			return (
				<FormDealerCredentials nextStep={nextStep} handleFormData={handleInput} values={formData} />
			);
		case 2:
			return (
				<FormDealerDetails
					nextStep={nextStep}
					prevStep={prevStep}
					handleFormData={handleInput}
					values={formData}
				/>
			);
		case 3:
			return (
				<FormDealerService
					nextStep={nextStep}
					prevStep={prevStep}
					handleFormData={handleInput}
					values={formData}
				/>
			);
		case 4:
			return <Success />;
		default:
			// do nothing
			return null;
	}
};

export default DealerReg;
