import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container';
import { Button } from 'react-bootstrap';
function Home() {
    return (
        <div className="homeDiv App">
            <Container maxWidth="sm">
                <Box component="div" sx={{ p: 2, border: '1px solid grey', margin:'80px' }} >
                    <Button variant="primary" size="lg" active>
                        Login As User
                    </Button>{' '}
                    <Button variant="secondary" size="lg" active>
                        Login As Dealer
                    </Button>
                    <Box component="form" sx={{ p: 2, border: '5px solid grey', margin:'10px' }}>
                        <div style={{margin:'10px'}}>
                            <TextField id="outlined-basic" color="warning" label="Location" variant="outlined" />
                        </div>
                        <div style={{margin:'10px'}}>
                            <TextField id="outlined-basic" color="info" type="number" label="Mobile No." variant="outlined" />
                        </div>
                        <Button variant="primary">Send OTP</Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default Home;