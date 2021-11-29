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



    return (
        <>
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
                    <Button type="submit">Book Now</Button>
                </div>
            </form>
        </>

    );
}

export default Booking;