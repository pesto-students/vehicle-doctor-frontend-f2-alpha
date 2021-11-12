import React, { useEffect, useState } from 'react';
import { Service } from './Interfaces';
import axios, { AxiosResponse } from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Row, Col } from "react-bootstrap";

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
        <div id="services">
            <div>
                <h1>Services</h1>
            </div>
            <Row className="g-2">
                {
                    serviceData.map((item, idx) =>
                        <Col key={idx}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`https://picsum.photos/200/300?random-${item.id}`}
                                        alt="green iguana"
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
                        </Col>
                    )
                }
            </Row>

        </div>
    );
}

export default Services;