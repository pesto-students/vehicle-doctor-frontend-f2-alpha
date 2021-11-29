import React, { useState } from 'react';
import logo from '../../img/VehicleDr_logo.jpg';
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
import { ICustomerDetails } from '../../Interfaces/ICustomerDetails';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

type Props = {
    open: boolean;
    handleClose: (val: boolean) => void;
    mobile: string;
}

interface IFormInput {
    custName: string;
    custEmail: string;
}

const schema = yup.object({
    custName: yup.string().required('Name is required.'),
    custEmail: yup.string().email('Must be a valid email').max(255).required('Email is required'),
}).required();

const CustomerDeatailsModal: React.FC<Props> = ({ open, handleClose, mobile }) => {

    const [summary, SetSummaryID] = useState<string>();

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(schema)
    });

    const [formData, setFormData] = useState<ICustomerDetails>({
        customer_name: '',
        mobile: '',
        email: '',
    });

    const onSubmit = (data: IFormInput) => {
        console.log(data);
        formData.customer_name = data.custName;
        formData.mobile = mobile;
        formData.email = data.custEmail;

        console.log('FormData', formData);
        axios.post('/customer/add', formData)
            .then((response: AxiosResponse) => {
                SetSummaryID(response.data);
            });
            handleClose(false);
    }

    return (

        <Modal size='sm' aria-labelledby='contained-modal-title-vcenter' centered show={open} onHide={handleClose} backdrop='static' keyboard={false}>
            <Modal.Header className='modalHeader' closeButton>
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
                        {/* <div className='modalBody'>
                            <TextField
                                id='input-with-icon-textfield'
                                label='Locality/Street'
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
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <Room />
                                        </InputAdornment>
                                    )
                                }}
                                variant='standard'
                            />
                        </div> */}
                    </div>
                    <div style={{textAlign:'center'}}>
                        <Button size='sm' variant='primary' type="submit">
                            REGISTER
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default CustomerDeatailsModal;