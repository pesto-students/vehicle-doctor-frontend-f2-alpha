import React, { useEffect, useState } from 'react';
import { Service } from './Interfaces';
import axios, { AxiosResponse } from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import logo from '../img/s1.jpg';

function Services() {
    const [serviceData, setServiceData] = useState<Service[]>([]);

    useEffect(() => {
        axios.get<Service[]>('http://localhost:3001/service/types/')
            .then((response: AxiosResponse) => {
                setServiceData(response.data);
            })
    }, []);

    console.log('Service Data', serviceData);

    return (
        <div id="services" className="homeDiv">
            <div>
                <h3>Services</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap',alignItems: 'center', justifyContent:'center'}}>
                {
                    serviceData.map((item, idx) =>
                        <div style={{margin:'10px'}} key={idx}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={logo}
                                        // image={`https://picsum.photos/200/300?random-${item.id}`}
                                        alt="icon"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.id}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.service_name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.service_type}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Services;