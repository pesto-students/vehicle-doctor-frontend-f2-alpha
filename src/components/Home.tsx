import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container';
import { Button, Table } from 'react-bootstrap';
import logo from '../img/service.jpg';
import Typography from '@mui/material/Typography';


function Home() {
    return (
        <div id="home" className="homeDiv altApp">
            <Table>
                <tr>
                    <td>
                        <div className="homeImg">
                            <img src={logo} alt="logo" />
                        </div>
                    </td>
                    <td>
                        <Container>
                            <Box component="div" sx={{ p: 2,backgroundColor:'rgb(235, 231, 231)',boxShadow: '0 0 0.5px 0.2px'}} >
                                <Button style={{ margin: '5px' }} variant="primary" disabled size="lg" active>
                                    Login As User
                                </Button>{' '}
                                <Box component="form" sx={{ p: 2, border: '0.3px solid grey', borderRadius: '20px', margin: '10px' }}>
                                    {/* <div style={{ margin: '10px' }}>
                                        <TextField id="outlined-basic" color="warning" label="Location" variant="outlined" />
                                    </div> */}
                                    <div style={{ margin: '10px' }}>
                                        <TextField id="outlined-basic" color="info" type="mobile" label="Mobile No." variant="outlined" />
                                    </div>
                                    <Button variant="primary">Send OTP</Button>
                                </Box>
                            </Box>
                        </Container>
                    </td>
                </tr>
            </Table>
        </div>
    );
}

export default Home;