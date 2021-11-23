import  { useEffect, useState } from 'react';
import { Service } from '../Interfaces/ServiceInterfaces';
import axios, { AxiosResponse } from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import logo from '../img/s1.jpg';
import {
    Link
  } from "react-router-dom";


function Services() {
    const [serviceData, setServiceData] = useState<Service[]>([]);

    useEffect(() => {
        axios.get<Service[]>('http://localhost:3001/service/types/')
            .then((response: AxiosResponse) => {
                setServiceData(response.data);
            })
    }, []);
    return (
        <>
        <div id="services" style={{padding:'5%'}} className="anim">
            <div>
                <h3>OUR SERVICES</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap',alignItems: 'center', justifyContent:'center'}}>
                {
                    serviceData.map((item, idx) =>
                    <div style={{margin:'10px'}} key={idx}>
                             <Link to={{pathname:`/dealers/${item.id}`}} >
                               <Card>
                                 <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={logo}
                                        alt="icon"
                                    />
                                    <CardContent>
                                        <Typography variant="h4" color="text.secondary">
                                            {item.service_type}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                             </Card>
                        </Link>
                        </div>
                    )
                }
            </div>
        </div>
        </>
    );
   
}

export default Services;