// Interface for Dealer Vehicle Service Props
export interface IDealerVehService {
	nextStep: Function;
	prevStep: Function;
	handleFormData: any;
	values: {
		vehicletype: {
			vehicle_type: string;
		};
		services: [
			{
				service_type: string;
				cost: number;
			}
		];
	};
}

// interface for Vehicle Type
export interface IVehicleType {
	vehicletype: {
		id: number;
		vehicle_type: string;
	};
}

//interface for Service type
//prettier-ignore
export interface IServices {
	services: [
		{
			id: number,
			service_type: string,
			service_name: string,
			cost: number
		},
	];
}

// Interface for Dealer Service Form
export interface IDealerServiceForm {
	vehicletype: {
		vehicle_type: string;
	};
	services: [
		{
			service_type: string;
			service_name: string;
			cost: number;
		}
	];
}
