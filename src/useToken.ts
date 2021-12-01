import { useState } from 'react';
import { ICustomerDetails } from './Interfaces/ICustomerDetails';

export default function useToken(){
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        if(tokenString){
        const userToken = JSON.parse(tokenString);
        return userToken?.token;
        }
    }
    const [token,setToken] = useState(getToken());
    const saveToken = (userToken:any) =>{
        sessionStorage.setItem('token',JSON.stringify(userToken));
        setToken(userToken);
    }

    return{
        setToken:saveToken,
        token
    }
};