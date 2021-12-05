import React, { SyntheticEvent, useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import DealerProfile from './DealerProfile';
import { IDealerSignup } from '../Interfaces/IDealerRegistration';
import { ISignedInDealer } from '../Interfaces/IDealerLogin';

interface Props {
	show: boolean;
	loggedInDealer: ISignedInDealer;
	//Token: any;
}

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

const DealerDashboard: React.FC<Props> = ({ show, loggedInDealer }): JSX.Element => {
	const [tabStep, setTabStep] = useState<number>(0);

	const handleTabStep = (e: SyntheticEvent, val: number): void => {
		setTabStep(val);
	};

	return (
		<div>
			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, bgcolor: 'background.paper' }}>
					<Tabs value={tabStep} onChange={handleTabStep} centered>
						<Tab label='Profile' {...a11yProps(0)} />
						<Tab label='Services' {...a11yProps(1)} />
						<Tab label='Bookings' {...a11yProps(2)} />
					</Tabs>
				</Box>
				<TabPanel value={tabStep} index={0}>
					<DealerProfile loggedInDealer={loggedInDealer} />
				</TabPanel>
				<TabPanel value={tabStep} index={1}>
					Services
				</TabPanel>
				<TabPanel value={tabStep} index={2}>
					Bookings
				</TabPanel>
			</Box>
		</div>
	);
};

export default DealerDashboard;
