// Interface for Dealer Details Props
export interface IDealerDetails {
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

//Interface for DealerDetails Form Fields
export interface IDealerDetailForm {
	locality: string;
	city: string;
	state: string;
	pincode: string;
	gst_no: string;
}
