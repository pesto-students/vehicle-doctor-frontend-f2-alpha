//prettier-ignore
export interface DealerSignup {
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
	vehicletype: {
		vehicle_type: string
	},
	services: [
		{
			service_type: string,
			cost: number
		}
	]
}
