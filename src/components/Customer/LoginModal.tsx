import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import InputAdornment from '@mui/material/InputAdornment';
import CallIcon from '@mui/icons-material/Call';
import TextField from '@mui/material/TextField';
import firebase from '../../firebase';
import { Event } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { ILoginInterface } from '../../Interfaces/ILoginInterface';
import { SUBMIT, VALIDATE } from '../../Constants/common.constant';
import CustomerDeatailsModal from './CustomerDeatailsModal';
import { AxiosResponse } from 'axios';
import axios from '../../BaseURL';
import { ICustomerDetails } from '../../Interfaces/ICustomerDetails';
import ReactLoading from "react-loading";


type Props = {
    open: boolean;
    handleClose: (val: boolean) => void;
    setToken: (val: any) => void;
}
declare global {
    interface Window {
        recaptchaVerifier: any;
        confirmationResult: any;
    }
}

const LoginModal: React.FC<Props> = ({ open, handleClose, setToken }) => {
    const initialState = {
        mobile: "",
        otp: ""
    };
    const [state, setState] = useState<ILoginInterface>(initialState);
    const [result, setConfirmationResult] = useState<any>();
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    window.recaptchaVerifier = window.recaptchaVerifier || {};
    const phoneRegExp = /^[1-9][0-9]{9}$/;

    const CustomerDetailsClose = () => {
        setShowInfo(false);
    };

    const validationSchema: Yup.SchemaOf<ILoginInterface> = Yup.object().shape({
        mobile: Yup.string()
            .matches(phoneRegExp, 'Mobile Number is invalid')
            .typeError('Mobile must be a 10-Digit number')
            .required('Please enter 10-Digit Mobile Number')
            .min(10, 'Mobile Number should have 10 digits'),
        otp: Yup.string()
    });

    const handleChange = (input: string) => (e: any) => {
        const { value } = e.target;
        setState(prevState => ({
            ...prevState,
            [input]: value,
        }))
    }
    const clearState = () => {
        setState({...initialState});
      };

    const { register, control, handleSubmit, formState: { errors, isValid } } = useForm<ILoginInterface>({
        mode: 'all',
        resolver: yupResolver(validationSchema)
    });

    const configureCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response: any) => {
                onSignInSubmit(Event);
            },
            defaultCountry: "IN"
        });
    }

    const onSignInSubmit = (e: any) => {
        console.log(state.mobile);
        e.preventDefault();
        configureCaptcha()
        const phoneNumber = "+91" + state.mobile
        console.log(phoneNumber)
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                appVerifier.clear();
                window.confirmationResult = confirmationResult;
                setConfirmationResult(window.confirmationResult)
                console.log(result);
                console.log("OTP has been sent")
            }).catch((error) => {
                console.log(error);
                console.log("SMS not sent")
            });

    }

    const onSubmitOTP = (e: any) => {
        e.preventDefault()
        const code = state.otp
        window.confirmationResult.confirm(code).then((result: any) => {
            // User signed in successfully.
            axios.get<ICustomerDetails>(`/customer/search/${state.mobile}`)
                .then((response: AxiosResponse) => {
                    console.log(response.data);
                    setLoading(false);
                    if (response.data.customer_name == null) {
                        setShowInfo(true);
                    } else {
                        setToken(response.data);
                        setShowInfo(false);
                    }
                });
            window.confirmationResult = null;
            handleClose(true);
        }).catch((error: any) => {
            console.log(error);
        });

    }

    return (
        <>
            <Modal
                size='sm'
                aria-labelledby='contained-modal-title-vcenter'
                centered
                show={open}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}>
                <Modal.Header className='modalHeader' closeButton>
                    Login
                </Modal.Header>

                <Modal.Body>
                    {window.confirmationResult == null ?
                        <div className='divModal'>
                            <div id="sign-in-button"></div>

                            <TextField
                                id='input-with-icon-textfield'
                                label='Mobile'
                                type="number"
                                {...register('mobile')}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <CallIcon />
                                        </InputAdornment>
                                    )
                                }}
                                variant='standard'
                                onChange={handleChange('mobile')}
                                required
                                error={errors.mobile ? true : false}
                                helperText={errors.mobile ? errors.mobile.message : ' '}
                            />
                        </div>
                        :
                        <div className='divModal'>
                            <TextField
                                id='input-with-icon-textfield'
                                label='OTP'
                                type="number"
                                {...register('otp')}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                        </InputAdornment>
                                    )
                                }}
                                variant='standard'
                                onChange={handleChange('otp')}
                            />
                        </div>}
                </Modal.Body>

                <Modal.Footer>
                    {window.confirmationResult == null ?
                        <Button size='sm' variant='primary' type="submit" onClick={onSignInSubmit} disabled={!isValid}>
                            {SUBMIT}
                        </Button> :
                        <Button size='sm' variant='primary' type="submit" onClick={onSubmitOTP}>
                            {VALIDATE}
                        </Button>}
                </Modal.Footer>
            </Modal>
            <CustomerDeatailsModal mobile={state.mobile} open={showInfo} handleClose={CustomerDetailsClose} setToken={setToken} />
        </>
    )
}

export default LoginModal;