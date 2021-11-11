import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container';
import { Button } from 'react-bootstrap';
import logo from '../img/service.jpg';
function Home() {
    return (
        <div className="homeDiv">
            <table>
                <tr>
                    <td>
                        <div className="example">
                            <img src={logo} alt="logo" />
                        </div>
                    </td>
                    <td>
                        <Container>
                            <Box component="div" sx={{ p: 2, border: '1px solid grey', boxShadow: '0 0 5px 2px', margin: '80px' }} >
                                <Button style={{ margin: '5px' }} variant="primary" disabled size="lg" active>
                                    Login As User
                                </Button>{' '}
                                <Box component="form" sx={{ p: 2, border: '3px solid grey', borderRadius: '20px', margin: '10px' }}>
                                    <div style={{ margin: '10px' }}>
                                        <TextField id="outlined-basic" color="warning" label="Location" variant="outlined" />
                                    </div>
                                    <div style={{ margin: '10px' }}>
                                        <TextField id="outlined-basic" color="info" type="number" label="Mobile No." variant="outlined" />
                                    </div>
                                    <Button variant="primary">Send OTP</Button>
                                </Box>
                            </Box>
                        </Container>
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default Home;