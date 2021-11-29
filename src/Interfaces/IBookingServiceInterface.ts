import { DateType } from "@date-io/type";

export interface IBookingService {
	refrence_id: string;
	vehicle_reg_no: string;
	vehicle_model: string;
	pick_up:number;
	pick_up_date:Date | null;
	drop_date:Date | null;
	customer_id:number;
	dealer_id:number;
	service_id:number;
	status_id:number;
	vehicle_type_id:number;
}
