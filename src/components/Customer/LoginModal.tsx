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
import CustomerDeatailsModal from './CustomerDetailsModal';
import { AxiosResponse } from 'axios';
import axios from '../../BaseURL';
import { ICustomerDetails } from '../../Interfaces/ICustomerDetails';
import { Dealer } from '../../Interfaces/IDealerInterface';
import Booking from '../Booking';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { blue } from '@mui/material/colors';


type Props = {
    open: boolean;
    handleClose: (val: boolean) => void;
    setToken: (val: any) => void;
    SelectedDealer: Dealer | undefined;
    serviceData: any;
    IsLogin :boolean;
    isHome:boolean;
    handleDealer:(val:boolean)=>void;
}
declare global {
    interface Window {
        recaptchaVerifier: any;
        confirmationResult: any;
    }
}

const LoginModal: React.FC<Props> = ({ open, handleClose, setToken ,SelectedDealer,serviceData,IsLogin,isHome,handleDealer}) => {
    const initialState = {
        mobile: "",
        otp: ""
    };
    const [state, setState] = useState<ILoginInterface>(initialState);
    const [result, setConfirmationResult] = useState<any>();
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [showBook, setShowBook] = useState<boolean>(false);
    const [customerData,setCustomerData]=useState<ICustomerDetails>();
    window.recaptchaVerifier = window.recaptchaVerifier || {};
    const phoneRegExp = /^[1-9][0-9]{9}$/;

    const CustomerDetailsClose = () => {
        setShowInfo(false);
    };

    const handleBooking = () => {
        setShowBook(false);
    }

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

    const { register, formState: { errors, isValid } } = useForm<ILoginInterface>({
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
        e.preventDefault();
        setLoading(false);
        configureCaptcha()
        const phoneNumber = "+91" + state.mobile;
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                appVerifier.clear();
                window.confirmationResult = confirmationResult;
                setConfirmationResult(window.confirmationResult)
                console.log("OTP has been sent");
                setLoading(true);
            }).catch((error) => {
                console.log(error);
                console.log("SMS not sent");
            });
    }

    const onSubmitOTP = (e: any) => {
        e.preventDefault();
        setLoading(false);
        const code = state.otp;
        window.confirmationResult.confirm(code).then((result: any) => {
            // User signed in successfully.
            axios.get<ICustomerDetails>(`/customer/search/${state.mobile}`)
                .then((response: AxiosResponse) => {
                    setLoading(true);
                    if (response.data.customer_name == null) {
                        setShowInfo(true);
                    } else {
                        setToken(response.data);
                        setCustomerData(response.data);
                        setShowInfo(false);
                        if(IsLogin){
                        setShowBook(false);
                        }else{
                            setShowBook(true); 
                        }
                    }
                });
            window.confirmationResult = null;
            handleClose(true);
        }).catch((error: any) => {
            console.log(error);
        });

    }
    const NavigateToHome = () => {
        handleClose(true);
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
                    {loading ? null
                        :<Box sx={{ display: 'flex', justifyContent:'center' }}>
                            <CircularProgress />
                        </Box>
                    }
                    {window.confirmationResult == null ?
                        <div className='divModal'>
                            <div id="sign-in-button"></div>
                            <TextField
                                id='input-with-icon-textfield'
                                label='Mobile'
                                type="mobile"
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
                        <Button size='sm' variant='primary' type="submit" onClick={onSignInSubmit} disabled={!isValid || !loading}>
                            {SUBMIT}
                        </Button> :
                        <Button size='sm' variant='primary' type="submit"  onClick={onSubmitOTP} disabled={!loading}>
                            {VALIDATE}
                        </Button>}
                </Modal.Footer>
            </Modal>
            <CustomerDeatailsModal mobile={state.mobile} open={showInfo} handleClose={CustomerDetailsClose} setToken={setToken} />
            <Modal fullscreen aria-labelledby="contained-modal-title-vcenter" centered show={showBook} onHide={handleBooking}>
                <Modal.Header closeButton style={{ color: 'white', backgroundColor: '#0275d8' }}>
                {isHome ? null :  <IconButton color="secondary" aria-label="add an home" onClick={NavigateToHome}>
                        <HomeIcon sx={{ fontSize: 35 ,color:blue[50]}} />
                    </IconButton> }
                    <span style={{paddingLeft:'500px',fontSize:35}}>Booking Details</span>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:'lightgrey'}}>
                    <div>
                        {SelectedDealer ? <Booking SelectedDealer={SelectedDealer} serviceData={serviceData} handleClose={handleBooking} handleDealer={handleDealer} customerData={customerData} isHome={isHome} /> : null}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default LoginModal;