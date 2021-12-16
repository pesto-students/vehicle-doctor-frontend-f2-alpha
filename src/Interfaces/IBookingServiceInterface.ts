import moment, { Moment } from "moment";

export interface IBookingService {
	refrence_id: string;
	vehicle_reg_no: string;
	vehicle_model: string;
	pick_up:number;
	pick_up_date:Moment | string;
	drop_date:Moment | string;
	customer_id:number;
	dealer_id:number;
	service_id:number;
	status_id:number;
	vehicle_type_id:number;
}
