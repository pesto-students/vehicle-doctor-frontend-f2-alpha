import React, { useState } from 'react';
import { InputLabel, TextField } from '@mui/material';
import { ISignedInDealer } from '../Interfaces/IDealerLogin';

interface Props {
	loggedInDealer: ISignedInDealer;
	//Token: any;
}

const DealerProfile: React.FC<Props> = ({ loggedInDealer }) => {
	return (
		<div style={{ padding: '5%' }}>
			<table style={{ width: '100%' }}>
				<tr>
					<td>
						<InputLabel>Dealer Name: </InputLabel>
					</td>
					<td>
						<TextField name='name' disabled value={loggedInDealer.name} />
					</td>
					<td>
						<InputLabel>Mobile: </InputLabel>
					</td>
					<td>
						<TextField name='mobile' disabled value={loggedInDealer.mobile} />
					</td>
				</tr>

				<tr>
					<td>
						<InputLabel>Email: </InputLabel>
					</td>
					<td>
						<TextField type='email' name='name' disabled value={loggedInDealer.email_ID} />
					</td>
					<td>
						<InputLabel>Password: </InputLabel>
					</td>
					<td>
						<TextField type='password' name='mobile' disabled value={loggedInDealer.password} />
					</td>
				</tr>

				<tr>
					<td>
						<InputLabel>Locality: </InputLabel>
					</td>
					<td>
						<TextField name='locality' disabled value={loggedInDealer.locality} />
					</td>
					<td>
						<InputLabel>City: </InputLabel>
					</td>
					<td>
						<TextField name='city' disabled value={loggedInDealer.city} />
					</td>
				</tr>
				<tr>
					<td>
						<InputLabel>State: </InputLabel>
					</td>
					<td>
						<TextField name='state' disabled value={loggedInDealer.state} />
					</td>
					<td>
						<InputLabel>Pin: </InputLabel>
					</td>
					<td>
						<TextField name='pincode' disabled value={loggedInDealer.pincode} />
					</td>
				</tr>
				<tr>
					<td>
						<InputLabel>GST No: </InputLabel>
					</td>
					<td>
						<TextField name='gst_no' disabled value={loggedInDealer.gst_no} />
					</td>
					<td>
						<InputLabel>Vehicle Type: </InputLabel>
					</td>
					<td>
						<TextField
							name='vehicle_type'
							disabled
							value={loggedInDealer.Vehicletype.vehicle_type}
						/>
					</td>
				</tr>
			</table>
		</div>
	);
};

export default DealerProfile;
