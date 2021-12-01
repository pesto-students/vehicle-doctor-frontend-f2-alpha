export interface ICustomerFormDetails {
	customer_name: string;
	mobile: string;
	email: string;
	location: {
		locality: string;
		city: string;
		state: string;
		pincode: string;
		lat: string
		long: string
		isHomeAddress: number;
	}
}