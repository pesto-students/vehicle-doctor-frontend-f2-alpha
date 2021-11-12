import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container';
import { Button, Table } from 'react-bootstrap';
import logo from '../img/service.jpg';
import Typography from '@mui/material/Typography';

function Testimonials() {
    return (
        <div id="rewards" className="App">
            <Table>
                <tr>
                    <td>
                    <Container>
                            <Box  height={300}
      width={300} borderRadius={3} component="div" sx={{ backgroundColor:'white',  border: '1px light grey', boxShadow: '0 0 5px 2px', margin: '30px' }} >
                               
                            </Box>
                        </Container>
                    </td>
                    <td>
                        <Container>
                            <Box height={300}
      width={300} borderRadius={3} component="div" sx={{ backgroundColor:'white',  border: '1px light grey', boxShadow: '0 0 5px 2px', margin: '10px' }} >
                                    
                              
                            </Box>
                        </Container>
                    </td>
                    <td>
                        <Container>
                            <Box height={300}
      width={300} borderRadius={3} component="div" sx={{ backgroundColor:'white',  border: '1px light grey', boxShadow: '0 0 5px 2px', margin: '10px' }} >
                                    
                              
                            </Box>
                        </Container>
                    </td>
                    <td>
                        <Container>
                            <Box height={300}
      width={300} borderRadius={3} component="div" sx={{ backgroundColor:'white', border: '1px light grey', boxShadow: '0 0 5px 2px', margin: '10px' }} >
                            </Box>
                        </Container>
                    </td>
                </tr>
            </Table>
        
        </div>
    );
}

export default Testimonials;