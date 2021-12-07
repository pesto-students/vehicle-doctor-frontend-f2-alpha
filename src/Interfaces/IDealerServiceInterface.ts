export interface DealerService {
    service_id:number,
    discription:string,
    cost:number,
    serviceTypes:{
        service_type:string,
        service_name:string
    }
}