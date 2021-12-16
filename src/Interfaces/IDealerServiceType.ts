// Interface for Dealer Vehicle Service Props
export interface IDealerVehService {
	nextStep: Function;
	prevStep: Function;
	handleFormData: any;
	values: {
		vehicle_type: number;
		service_type: number;
		service_name: string;
		cost: number;
	};
}

// interface for Vehicle Type
export interface IVehicleType {
	id: number;
	vehicle_type: string;
}

//interface for Service type
//prettier-ignore
export interface IServices {
	id: number,
	service_type: number,
	service_name: string,
	cost: number	
}

// Interface for Dealer Service Form
export interface IDealerServiceForm {
	vehicle_type: string;
	service_type: number;
	service_name: string;
	cost: number;
}
