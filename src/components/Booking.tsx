import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Dealer } from '../Interfaces/IDealerInterface';
import { IBookingService } from '../Interfaces/IBookingServiceInterface';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import axios from '../BaseURL';
import { AxiosResponse } from 'axios';
import { Carousel } from 'react-bootstrap';
import Rating from '@mui/material/Rating';


type Props = {
    SelectedDealer: Dealer;
    serviceData: any;
    handleClose: (val: boolean) => void;
}


const Booking: React.FC<Props> = ({ SelectedDealer, serviceData, handleClose }) => {
    const [pickupDateValue, setpickupdateValue] = React.useState<Date | null>(new Date());
    const [formData, setFormData] = useState<IBookingService>({
        refrence_id: '',
        vehicle_reg_no: '',
        vehicle_model: '',
        pick_up: 0,
        pick_up_date: new Date(),
        drop_date: new Date(),
        customer_id: 0,
        dealer_id: 0,
        service_id: 0,
        status_id: 0,
        vehicle_type_id: 0,
    });
    const [summary, SetSummaryID] = useState<string>();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        var value = (Math.random().toString(36).substr(2, 6));
        formData.refrence_id = value.toUpperCase();
        formData.dealer_id = SelectedDealer.dealer_id;
        formData.status_id = 1;
        formData.service_id = serviceData.id;
        formData.customer_id = 1;
        formData.vehicle_type_id = SelectedDealer.vehicle_type_id;
        if (pickupDateValue != null) {
            console.log(value);
            formData.pick_up_date = pickupDateValue;
            formData.drop_date = addDays(pickupDateValue);
        }
        console.log('FormData', formData);
        axios.post('/order/Service/Booking', formData)
            .then((response: AxiosResponse) => {
                SetSummaryID(response.data);
                handleClose(true);
            });

    }

    function addDays(pick_up_date: Date) {
        var result = new Date(pick_up_date);
        result.setDate(result.getDate() + 7);
        return result;
    }

    const handleInput = (input: string) => (e: any) => {
        const { value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [input]: value
        }));
        console.log(formData);
    };

    //For Carousel
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: any, e: any) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="flex-container" style={{alignItems:'flex-start', backgroundColor: 'lightgrey'}}>
            <div style={{ flex: '40%'}}>
                <div>
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://media.istockphoto.com/photos/this-bike-will-be-perfect-picture-id614415432?k=20&m=614415432&s=612x612&w=0&h=pxoABtoInMevUnC08h4rlbBVqc-5q1f4Pv4JW37SfAI="
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://media.istockphoto.com/photos/mechanic-working-at-a-garage-and-wearing-a-facemask-picture-id1279375828?b=1&k=20&m=1279375828&s=170667a&w=0&h=ivHVSmEOVL6ujvW2OOZd_w1Uvbqap8PK11vfOb0ujUM="
                                alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://hjfoxinsurance.com/wp-content/uploads/2016/03/iStock_000003465384Medium.76111338.jpg"
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div style={{ padding: '5%', backgroundColor: 'white' }}>
                    <table style={{width:'100%'}}>
                        <tr>
                            <td>
                                <h3 style={{ textTransform: 'uppercase' }}>{serviceData.serviceName}</h3>
                            </td>
                            <td style={{textAlign:'right', color: 'orangered'}}>
                                {SelectedDealer.Services.map((dataItem) => (
                                    <h3>₹ {dataItem.cost}</h3>
                                ))}
                            </td>
                        </tr>
                    </table>
                </div>
                <div style={{padding:'5%'}}>
                    <h5>{SelectedDealer.name}</h5>
                    <div>                        
                        <ul style={{listStyleType:'none'}}>
                            <li>
                                <h6>Contact Details:</h6><p>{SelectedDealer.mobile}, {SelectedDealer.email}, {SelectedDealer.locality}, {SelectedDealer.city}, {SelectedDealer.state}, IND. - {SelectedDealer.pincode}</p>
                            </li>
                        </ul>
                    </div>
                    <div>                        
                        <ul style={{listStyleType:'none'}}>
                            <li>
                                <h6>Reviews and Comments:</h6>
                                    {SelectedDealer.dealer_history.map((dataItem) => (                                        
                                        <p><span style={{backgroundColor:'yellow', borderRadius:'100%'}}>&#9734;</span> {dataItem.rating} - {dataItem.comments}</p>                                       
                                    ))}
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul style={{listStyleType:'none'}}>
                            <li>
                                <h6>Service Description:</h6>
                                        {SelectedDealer.Services.map((dataItem) => (                                        
                                            <p>{dataItem.discription}</p>                                       
                                        ))}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div style={{ flex: '40%', backgroundColor: 'white' }}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="divModal">
                            <h5>Add more about your vehicle</h5>
                        </div>
                        <div className="flex-container" style={{ textAlign: 'center' }}>
                            <div className="modalBody">
                                <TextField id="input-with-icon-textfield" label="Vehicle Type" variant="standard" value={SelectedDealer.Vehicletype.vehicle_type} disabled />
                            </div>
                            <div className="modalBody">
                                <TextField id="input-with-icon-textfield" label="Vehicle Model" variant="standard" onChange={handleInput('vehicle_model')} />
                            </div>
                            <div className="modalBody">
                                <TextField id="input-with-icon-textfield" label="Vehicle Reg No." variant="standard" onChange={handleInput('vehicle_reg_no')} />
                            </div>
                            <div className="modalBody">
                                <TextField id="input-with-icon-textfield" variant="standard" value={serviceData.serviceName} disabled />
                            </div>
                        </div>
                        <div className="divModal">
                            <h5>Personal Details</h5>
                        </div>
                        <div className="flex-container" style={{ textAlign: 'center' }}>
                            <div className="modalBody">
                                <TextField id="input-with-icon-textfield" label="Name" variant="standard" disabled />
                            </div>
                            <div className="modalBody">
                                <TextField id="input-with-icon-textfield" label="Mobile No." variant="standard" disabled />
                            </div>
                            <div className="modalBody">
                                <TextField id="input-with-icon-textfield" label="E-Mail" variant="standard" disabled />
                            </div>
                            <div className="modalBody">
                                <TextField id="input-with-icon-textfield" label="Locality" variant="standard" disabled />
                            </div>
                            <div className="modalBody">
                                <TextField id="input-with-icon-textfield" label="City" variant="standard" disabled />
                            </div>
                            <div className="modalBody">
                                <TextField id="input-with-icon-textfield" label="State" variant="standard" disabled />
                            </div>
                        </div>
                        <div className="divModal">
                            <h5>Other Information</h5>
                        </div>
                        <div className="flex-container" style={{ textAlign: 'center' }}>
                            <div className="modalBody">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        renderInput={(params) => <TextField {...params} />}
                                        label="Pick Up Date/Time"
                                        value={pickupDateValue}
                                        onChange={(newValue) => {
                                            setpickupdateValue(newValue);
                                        }}
                                        minDateTime={new Date()}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className="modalBody">
                                <InputLabel id="demo-simple-select-standard-label">Pick UP</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    onChange={handleInput('pick_up')}
                                    label="Age"
                                >
                                    <MenuItem value={1}>YES</MenuItem>
                                    <MenuItem value={0}>NO</MenuItem>
                                </Select>
                            </div>
                            {SelectedDealer.Services.map((dataItem) => (
                                <ul>
                                    <TextField id="input-with-icon-textfield" value={dataItem.cost} disabled variant="standard" />
                                </ul>
                            ))}
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <Button type="submit">Book Now</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Booking;