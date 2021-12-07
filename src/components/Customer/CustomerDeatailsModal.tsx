import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import Room from '@mui/icons-material/Room';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import { Button, Modal } from 'react-bootstrap';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import axios from '../../BaseURL';
import { AxiosResponse } from 'axios';
import { ICustomerFormDetails } from '../../Interfaces/ICustomerFormDetails';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


type Props = {
    open: boolean;
    handleClose: (val: boolean) => void;
    mobile: string;
    setToken: (val:any) => void;
}

interface IFormInput {
    custName: string;
    custEmail: string;
    location:{
		locality:string;
		city:string;
		state:string;
		pincode:string;
		lat:string
		long:string
		isHomeAddress:number;
	}
}

const schema = yup.object({
    custName: yup.string().required('Name is required.'),
    custEmail: yup.string().email('Must be a valid email').max(255).required('Email is required'),
}).required();

const CustomerDeatailsModal: React.FC<Props> = ({ open, handleClose, mobile ,setToken}) => {

    const [summary, SetSummaryID] = useState<string>();

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(schema)
    });

    const [formData, setFormData] = useState<ICustomerFormDetails>({
        customer_name: '',
        mobile: '',
        email: '',
        location:{
            locality:'',
            city:'',
            state:'',
            pincode:'',
            lat:'',
            long:'',
            isHomeAddress:0,
        }
    });

    const onSubmit = (data: IFormInput) => {
        console.log(data);
        formData.customer_name = data.custName;
        formData.mobile = mobile;
        formData.email = data.custEmail;
        formData.location.locality=data.location.locality;
        formData.location.city=data.location.city;
        formData.location.state=data.location.state;
        formData.location.pincode=data.location.pincode;

        console.log('FormData', formData);
        axios.post('/customer/add', formData)
            .then((response: AxiosResponse) => {
                SetSummaryID(response.data);
                setToken(response.data);
            });
            handleClose(false);
    }

    return (

        <Modal style={{width:'100%'}} aria-labelledby='contained-modal-title-vcenter' centered show={open} onHide={handleClose} backdrop='static' keyboard={false}>
            <Modal.Header className='modalHeader'>
                Profile Information{' '}
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{textAlign:'center'}}>
                        <div className='modalBody'>
                            <TextField
                                id='input-with-icon-textfield'
                                label='Name'
                                {...register("custName")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <AccountCircleIcon />
                                        </InputAdornment>
                                    )
                                }}
                                variant='standard'
                                helperText={errors.custName?.message}
                            />
                        </div>
                        <div className='modalBody'>
                            <TextField
                                id='input-with-icon-textfield'
                                label='E-Mail'
                                {...register("custEmail")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <EmailIcon />
                                        </InputAdornment>
                                    )
                                }}
                                variant='standard'
                                helperText={errors.custEmail?.message}
                            />
                        </div>
                        <div className='modalBody'>
                            <TextField
                                id='input-with-icon-textfield'
                                label='Locality/Street'
                                {...register("location.locality")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <MapsHomeWorkIcon />
                                        </InputAdornment>
                                    )
                                }}
                                variant='standard'
                            />
                        </div>
                        <div className='modalBody'>
                            <TextField
                                id='input-with-icon-textfield'
                                label='City'
                                {...register("location.city")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <LocationCityIcon />
                                        </InputAdornment>
                                    )
                                }}
                                variant='standard'
                            />
                        </div>
                        <div className='modalBody'>
                            <TextField
                                id='input-with-icon-textfield'
                                label='State'
                                {...register("location.state")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <Room />
                                        </InputAdornment>
                                    )
                                }}
                                variant='standard'
                            />
                        </div>
                        <div className='modalBody'>
                            <TextField
                                id='input-with-icon-textfield'
                                label='PinCode'
                                {...register("location.pincode")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <Room />
                                        </InputAdornment>
                                    )
                                }}
                                variant='standard'
                            />
                        </div>
                    </div>
                    <div style={{textAlign:'center'}}>
                        <Button size='sm' variant='primary' type="submit">
                            SUBMIT
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default CustomerDeatailsModal;