import  { AxiosResponse } from 'axios';
import axios from '../BaseURL';
import { useEffect, useState } from 'react'
import { Vehicle } from '../Interfaces/VehicleInterface';


const useVehicleData = () => {
    const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);
    useEffect(() => {
        axios.get<Vehicle[]>('/vehicle/types/').then((response: AxiosResponse) => {
            setVehicleData(response.data);
        });

    }, []);
    return vehicleData;
}

export default useVehicleData;