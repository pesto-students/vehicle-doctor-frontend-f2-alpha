import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import Room from '@mui/icons-material/Room';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import { Button, Modal } from 'react-bootstrap';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import axios from '../../BaseURL';
import { AxiosResponse } from 'axios';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ICustomerDetails } from '../../Interfaces/ICustomerDetails';


type Props = {
    open: boolean;
    handleClose: (val: boolean) => void;
    mobile: string;
    setToken: (val:any) => void;
}

interface IFormInput {
    custName: string;
    custEmail: string;
    customer_location:{
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

    const [formData, setFormData] = useState<ICustomerDetails>({
        customer_location:{
            locality:'',
            city:'',
            state:'',
            pincode:'',
            lat:'',
            long:'',
            isHomeAddress:0,
        },
        customer_name: '',
        mobile: '',
        email: '',
    });

    const onSubmit = (data: IFormInput) => {
        formData.customer_name = data.custName;
        formData.mobile = mobile;
        formData.email = data.custEmail;
        formData.customer_location.locality=data.customer_location.locality;
        formData.customer_location.city=data.customer_location.city;
        formData.customer_location.state=data.customer_location.state;
        formData.customer_location.pincode=data.customer_location.pincode;
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
                Please Provide More Information{' '}
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
                                {...register("customer_location.locality")}
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
                                {...register("customer_location.city")}
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
                                {...register("customer_location.state")}
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
                                {...register("customer_location.pincode")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <EventNoteIcon/>
                                        </InputAdornment>
                                    )
                                }}
                                variant='standard'
                            />
                        </div>
                    </div>
                    <div style={{textAlign:'center'}}>
                        <Button size='sm' variant='primary' type="submit">
                            SAVE
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default CustomerDeatailsModal;