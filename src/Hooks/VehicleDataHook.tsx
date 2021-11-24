import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react'
import { Vehicle } from '../Interfaces/VehicleInterface';


const useVehicleData = () => {
    const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);


    useEffect(() => {
        axios.get<Vehicle[]>('http://localhost:3001/vehicle/types/').then((response: AxiosResponse) => {
            setVehicleData(response.data);
        });

    }, []);
    return vehicleData;
}

export default useVehicleData;