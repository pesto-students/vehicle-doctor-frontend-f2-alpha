import axios from 'axios';
import { useEffect, useState } from 'react'

const useGeoLocation = () => {
    interface IData {
        loaded: boolean;
        data: any
    }

    const [location, setLocation] = useState<IData | undefined>(undefined)

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&key=API_Key").then(
                res => {
                    if (res.data.error_message == null) {
                        const locdata = res.data.results;
                        console.log("logging array ", locdata);
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