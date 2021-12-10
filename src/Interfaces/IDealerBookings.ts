// Interface for Dealer Bookings
export interface IDealerBookings {
	refrence_id: string;
	vehicle_reg_no: string;
	vehicle_model: string;
	pick_up: boolean;
	pick_up_date: Date | null;
	drop_date: Date | null;
	status_id: number;
	Customer: {
		customer_name: string;
	};
	status: {
		status_name: string;
	};
	dealerService: {
		discription: string;
	};
	Vehicle_type: {
		vehicle_type: string;
	};
}

// Interface for Service status
export interface IServiceStatus {
	status_id: number;
	status_name: string;
}
