import React from 'react';
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
						<h6>Dealer Name: </h6>
					</td>
					<td>
						<p>{loggedInDealer.name}</p>
					</td>
					<td>
						<h6>Mobile: </h6>
					</td>
					<td>
						<p>{loggedInDealer.mobile}</p>
					</td>
				</tr>

				<tr>
					<td>
						<h6>Email: </h6>
					</td>
					<td>
						<p>{loggedInDealer.email_ID}</p>
					</td>
					<td>
						<h6>Password: </h6>
					</td>
					<td>
						<p>{loggedInDealer.password}</p>
					</td>
				</tr>

				<tr>
					<td>
						<h6>Locality: </h6>
					</td>
					<td>
						<p>{loggedInDealer.locality}</p>
					</td>
					<td>
						<h6>City: </h6>
					</td>
					<td>
						<p>{loggedInDealer.city}</p>
					</td>
				</tr>
				<tr>
					<td>
						<h6>State: </h6>
					</td>
					<td>
						<p>{loggedInDealer.state}</p>
					</td>
					<td>
						<h6>Pin: </h6>
					</td>
					<td>
						<p>{loggedInDealer.pincode}</p>
					</td>
				</tr>
				<tr>
					<td>
						<h6>GST No: </h6>
					</td>
					<td>
						<p>{loggedInDealer.gst_no}</p>
					</td>
					<td>
						<h6>Vehicle Type: </h6>
					</td>
					<td>
						<p>{loggedInDealer.Vehicletype.vehicle_type}</p>
					</td>
				</tr>
			</table>
		</div>
	);
};

export default DealerProfile;
