import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container';
import { Button, Table } from 'react-bootstrap';
import logo from '../img/service.jpg';
import Typography from '@mui/material/Typography';


function Home() {
    return (
        <div id="home" className="homeDiv">
            <Table>
                <tr>
                    <td>
                        <div>
                            <img src={logo} alt="logo" />
                        </div>
                    </td>
                    <td>
                        <Container>
                            <Box borderRadius={1} component="div" sx={{ p: 2,backgroundColor:'white', border: '1px light grey', boxShadow: '0 0 5px 2px', margin: '80px' }} >
                                    <Typography variant="h4" component="h2">
                                       LOGIN AS USER
                                    </Typography>
                                <Box component="form" sx={{ p: 2, border: '2px solid grey', borderRadius: '10px', margin: '10px' }}>
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