// Interface for Dealer Login
export interface IDealerLogin {
	email: string;
	password: string;
}

// Interface for Signed in Dealer
export interface ISignedInDealer {
	dealer_id: number;
	name: string;
	mobile: string;
	gst_no: string;
	locality: string;
	city: string;
	state: string;
	pincode: string;
	email: string;
	password: string;
	Vehicletype: {
		vehicle_type: string;
	};
}

// Interface for Dealer Services
export interface IDealerService {
	service_id: number;
	discription: string;
	cost: number;
	serviceTypes: {
		service_type: string;
		service_name: string;
	};
}
