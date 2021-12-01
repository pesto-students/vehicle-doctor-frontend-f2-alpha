export interface ICustomerDetails {
	customer_location: [
		{
			city: string;
			isHomeAddress: number;
			lat: string
			locality: string;
			long: string
			pincode: string;
			state: string;
		}
	]
	customer_name: string;
	email: string;
	mobile: string;
}
