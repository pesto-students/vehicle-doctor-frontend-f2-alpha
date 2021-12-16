import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { ISignedInDealer } from '../Interfaces/IDealerLogin';
import { IDealerBookings, IServiceStatus } from '../Interfaces/IDealerBookings';
import { AxiosResponse } from 'axios';
import axios from '../BaseURL';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type Props = {
	loggedInDealer: ISignedInDealer;
};

const DealerBookings: React.FC<Props> = ({ loggedInDealer }) => {
	const [bookingData, setBookingData] = useState<IDealerBookings[]>([]);
	const [renderTable, setRenderTable] = useState<boolean>(true);
	const [serviceStatus, setServiceStatus] = useState<IServiceStatus[]>([]);
	const [status, setStatus] = useState<any>({});
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (renderTable) {
			axios
				.get<[]>(`/order/dealerbookings/${loggedInDealer.dealer_id}`)
				.then((response: AxiosResponse) => {
					setBookingData(response.data);
				});
		}

		setRenderTable(false);

		axios.get<[]>(`/service/status`).then((response: AxiosResponse) => {
			setServiceStatus(response.data);
		});

		serviceStatus.map((row) => (status[row.status_id] = row.status_name));
		setStatus(status);
	}, [loggedInDealer.dealer_id, renderTable, serviceStatus, status]);


	const [columns, setColumns] = useState<any>([
		{
			title: 'Customer',
			field: 'Customer.customer_name',
			editable: 'never',
			cellStyle: { backgroundColor: 'rgb(205, 235, 253)' }
		},
		{
			title: 'Vehicle Reg No',
			field: 'vehicle_reg_no',
			editable: 'never',
			cellStyle: { backgroundColor: 'rgb(205, 235, 253)' }
		},
		{
			title: 'Model',
			field: 'vehicle_model',
			editable: 'never',
			cellStyle: { backgroundColor: 'rgb(205, 235, 253)' }
		},
		{
			title: 'Pickup',
			field: 'pick_up',
			lookup: { true: 'Yes', false: 'No' },
			editable: 'never',
			cellStyle: { backgroundColor: 'rgb(205, 235, 253)' }
		},
		{
			title: 'Pickup Date',
			field: 'pick_up_date',
			editable: 'never',
			cellStyle: { backgroundColor: 'rgb(205, 235, 253)' }
		},
		{
			title: 'Drop Date',
			field: 'drop_date',
			editable: 'never',
			cellStyle: { backgroundColor: 'rgb(205, 235, 253)' }
		},
		{
			title: 'Service',
			field: 'dealerService.discription',
			editable: 'never',
			cellStyle: { backgroundColor: 'rgb(205, 235, 253)' }
		},
		{
			title: 'Vehicle Type',
			field: 'Vehicle_type.vehicle_type',
			editable: 'never',
			cellStyle: { backgroundColor: 'rgb(205, 235, 253)' }
		},
		{
			title: 'Status',
			field: 'status.status_id',
			editable: 'onUpdate',
			lookup: status,
			cellStyle: { backgroundColor: 'rgb(205, 235, 253)' }
		}
	]);

	return (
		<div className='app-container'>
			{loading ? null
				: <Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress />
				</Box>
			}
			<MaterialTable
				title='Your Bookings'
				data={bookingData}
				columns={columns}
				options={{
					search: false,
					actionsColumnIndex: -1,
					headerStyle: { backgroundColor: 'rgb(117, 201, 250)' },
					actionsCellStyle: {
						backgroundColor: '#5AD7FB',
						color: '#041571'
					}
				}}
				editable={{
					onRowUpdate: (updatedRow: any, oldRow: any) =>
						new Promise<void>((resolve, reject) => {
							const index = oldRow.tableData.id;
							const updatedRows = [...bookingData];
							updatedRows[index] = updatedRow;
							setTimeout(() => {
								setLoading(true)
								setBookingData([...updatedRows]);
								resolve();
							}, 1000);
						})
				}}
			/>
		</div>
	);
};

export default DealerBookings;
