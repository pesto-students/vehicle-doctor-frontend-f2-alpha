import React, { useState } from 'react';
import { DealerSignup } from '../Interfaces/IDealerRegistration';
import FormDealerCredentials from './DealerSignup/FormDealerCredentials';
import FormDealerDetails from './DealerSignup/FormDealerDetails';
import FormDealerService from './DealerSignup/FormDealerService';
import Success from './DealerSignup/Success';

const DealerReg: React.FC = () => {
	const [step, setStep] = useState<number>(1);

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

	/**
	 * Increases the Step state variable by 1.
	 *
	 * @remarks
	 * This method is part of the {@link vehicledoctor-frontend#DealerSignup | Dealer Signup subsystem}
	 *
	 * @returns void
	 *
	 * @beta
	 */
	const nextStep = (): void => {
		setStep(step + 1);
	};

	/**
	 * Decreases the Step state variable by 1.
	 *
	 * @remarks
	 * This method is part of the {@link vehicledoctor-frontend#DealerSignup | Dealer Signup subsystem}
	 *
	 * @returns void
	 *
	 * @beta
	 */
	const prevStep = (): void => {
		setStep(step - 1);
	};

	/**
	 * Event handler to handle the form data.
	 *
	 * @remarks
	 * This method is part of the {@link vehicledoctor-frontend#DealerSignup | Dealer Signup subsystem}
	 *
	 * @param input - The data entered in the form fields
	 * @param e - The event object
	 * @returns void
	 *
	 * @beta
	 */
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
