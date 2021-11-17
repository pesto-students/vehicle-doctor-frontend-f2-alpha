import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import '../cssFiles/contactus.css';
import Link from '@mui/material/Link';



function ContactUs() {
    return (
        <div id="contactUs" className="contactDiv">
                <Box sx={{ p: 3,color:'white'}}>
                <Container maxWidth="lg">
                    <Grid container spacing={12}>
                        <Grid item xs={12} sm={4}>
                            <Box>
                                <Link href="/" color="inherit" underline="none">
                                    Home
                                </Link>
                            </Box>
                            <Box height={10}>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit" underline="none">
                                    RoadSide Assistance
                                </Link>
                            </Box>
                            <Box height={10}>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit" underline="none">
                                    Services
                                </Link>
                            </Box>
                            <Box height={10}>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit" underline="none">
                                    Partners
                                </Link>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                        <Box>
                        <Typography variant="h5" component="div">
                        <p>Call Us: +91 9876543210</p>
                        </Typography>
                        </Box>
                        <Box height={30}>
                       
                        </Box>
                        <Box>
                            <Typography variant="h5" component="div">
                                <p>Mail Us: Support@vehicledr.com</p>
                            </Typography>
                        </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box>
                                <Typography variant="h5" component="div">
                                Registered Office Address:
                                </Typography>
                            </Box>
                            <Box height={10}>
                               
                            </Box>
                            <Box>
                                <ul style={{listStyleType:'none', fontSize:'15px'}}>
                                    <li>Vehicle Doctor India Pvt Limited</li>
                                    <li>Udhyog Vihar Phase 4,Sector 18</li>
                                    <li>Gurgaon 122016</li>
                                    <li>Haryana, India</li>
                                </ul>
                            </Box>
                           
                        </Grid>
                    </Grid>
                </Container>
                </Box>
        </div>
    );
}

export default ContactUs;