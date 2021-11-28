import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Dealer } from '../Interfaces/IDealerInterface';
import { IBookingService } from '../Interfaces/IBookingServiceInterface';
import axios from '../BaseURL';
import { AxiosResponse } from 'axios';


type Props = {
    SelectedDealer: Dealer;
    ServiceType:number;
}


const Booking: React.FC<Props> = ({ SelectedDealer,ServiceType }) => {

    const [value, setValue] = React.useState<Date | null>(new Date());

    const [formData, setFormData] = useState<IBookingService>({
        refrence_id: '',
        vehicle_reg_no: '',
        vehicle_model: '',
        pick_up: 0,
        pick_up_date: '',
        drop_date:'',
        customer_id: 0,
        dealer_id: 0,
        service_id: 0,
        status_id: 0,
        vehicle_type_id: 0,
    });
    const [summary, SetSummaryID] = useState<string>();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        formData.refrence_id = 'AX12121';
        formData.dealer_id = SelectedDealer.dealer_id;
        formData.status_id = 1;
        formData.service_id= ServiceType;
        formData.customer_id=1;
        formData.vehicle_type_id=SelectedDealer.vehicle_type_id;

        console.log('FormData', formData);
        axios.post('order/Service/Booking', formData)
            .then((response: AxiosResponse) => {
                SetSummaryID(response.data);
            });
        console.log(summary);
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
                            <TextField id="input-with-icon-textfield" label="Vehicle Type" variant="standard" value={SelectedDealer.Vehicletype.vehicle_type} disabled/>
                        </div>
                        <div className="modalBody">
                            <TextField id="input-with-icon-textfield" label="Vehicle Model" variant="standard" />
                        </div>
                        <div className="modalBody">
                            <TextField id="input-with-icon-textfield" label="Vehicle Reg No." variant="standard" onChange={handleInput('vehicle_reg_no')} />
                        </div>
                        <div className="modalBody">
                            <TextField id="input-with-icon-textfield" label="Service" variant="standard" />
                        </div>
                    </div>
                    <div className="divModal">
                        <h5>Personal Details</h5>
                    </div>
                    <div className="flex-container" style={{ textAlign: 'center' }}>
                        <div className="modalBody">
                            <TextField id="input-with-icon-textfield" label="Name" variant="standard" />
                        </div>
                        <div className="modalBody">
                            <TextField id="input-with-icon-textfield" label="Mobile No." variant="standard" />
                        </div>
                        <div className="modalBody">
                            <TextField id="input-with-icon-textfield" label="E-Mail" variant="standard" />
                        </div>
                        <div className="modalBody">
                            <TextField id="input-with-icon-textfield" label="Locality" variant="standard" />
                        </div>
                        <div className="modalBody">
                            <TextField id="input-with-icon-textfield" label="City" variant="standard" />
                        </div>
                        <div className="modalBody">
                            <TextField id="input-with-icon-textfield" label="State" variant="standard" />
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
                                    label="Ignore date and time"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    minDateTime={new Date()}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="modalBody">
                            <TextField id="input-with-icon-textfield" label="Pick-up" variant="standard" />
                        </div>
                        <div className="modalBody">
                            <TextField id="input-with-icon-textfield" label="Total Price" disabled variant="standard" />
                        </div>
                    </div>
                    <Button type="submit">Book Now</Button>
                </div>
            </form>
        </>

    );
}

export default Booking;