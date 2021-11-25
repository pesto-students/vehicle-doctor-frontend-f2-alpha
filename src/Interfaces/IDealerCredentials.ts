//Interface for DealerCredentials Props
export interface IDealerCredentials {
	nextStep: Function;
	handleFormData: any;
	values: {
		name: string;
		mobile: string;
		email_ID: string;
		password: string;
		confirmPassword?: string;
	};
}

// Interface for DealerCredentials Form Fields
export interface IDealerCredForm {
	name: string;
	mobile: string;
	email_ID: string;
	password: string;
	confirmPassword?: string;
}
