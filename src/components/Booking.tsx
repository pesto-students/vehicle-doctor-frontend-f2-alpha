import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Dealer } from '../Interfaces/IDealerInterface';


type Props = {
    SelectedDealer:Dealer;
}


const Booking:  React.FC<Props> = ({ SelectedDealer }) => {
    
    const [value, setValue] = React.useState<Date | null>(new Date());
    return (
        <>
            <div>
                <div className="divModal">
                    <h5>Add more about your vehicle</h5>
                </div>
                <div className="flex-container" style={{ textAlign: 'center' }}>
                    <div className="modalBody">
                        <TextField id="input-with-icon-textfield" label="Vehicle Type" variant="standard" />
                    </div>
                    <div className="modalBody">
                        <TextField id="input-with-icon-textfield" label="Vehicle Model" variant="standard" />
                    </div>
                    <div className="modalBody">
                        <TextField id="input-with-icon-textfield" label="Vehicle Reg No." variant="standard" />
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
            </div>
        </>

    );
}

export default Booking;