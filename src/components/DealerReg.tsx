import React from 'react';
import { TextField } from '@mui/material';

function DealerReg() {
	return (
		<div>
			<div>
				<form noValidate autoComplete='off' method='POST'>
					<h1>PARTNER WITH US</h1>
					<h1>Enter your details below</h1>
					<TextField id='dealerName' label='Name' variant='outlined' required />
				</form>
			</div>
		</div>
	);
}

export default DealerReg;
