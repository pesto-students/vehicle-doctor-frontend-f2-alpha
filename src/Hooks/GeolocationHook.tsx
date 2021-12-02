import axios from 'axios';
import { useEffect, useState } from 'react'
//import { GOOGLE_API_KEY } from '../Constants/common.constant';

const useGeoLocation = () => {
    
    interface IData {
        loaded: boolean;
        data: any
    }

    const [location, setLocation] = useState<IData | undefined>(undefined)

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.REACT_APP_API_KEY}`).then(
                res => {
                    console.log("Google API Testing ", res.data);
                    if (res.data.error_message == null) {
                        const locdata = res.data.results;
                        
                        setLocation({
                            loaded: true,
                            data: locdata
                        });
                    } else {
                        setLocation({
                            loaded: false,
                            data: []
                        });
                    }
                }
            ).catch(error => {
                console.log(error);
                setLocation({
                    loaded: false,
                    data: []
                });
            })
        });

    }, []);

    return location;
}

export default useGeoLocation;