// Intrface for Dealer Registration
//prettier-ignore
export interface IDealerSignup {
	name: string,
	mobile: string,
	gst_no: string,
	locality: string,
	city: string,
	state: string,
	pincode: string,
	email_ID: string,
	password: string,
	confirm_password: string,
	vehicle_type: string,
	// service_type: number,
	// service_name: string,
	// cost: number	
}
