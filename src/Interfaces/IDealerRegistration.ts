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
	email: string,
	password: string,
	confirmPassword: string,
	vehicle_type_id: number,
	lat: number,
	lng: number
// 	services: [
// 		{
// 		serviceTypeId: number,
// 		discription: string,
// 		cost: number
// 	}
// ]		
}
