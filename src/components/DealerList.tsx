import Box from '@mui/material/Box';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Dealer } from '../Interfaces/DealerInterface';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {
    useParams,
  } from "react-router-dom";
import Container from "@mui/material/Container";
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Rating from '@mui/material/Rating';
// import { makeStyles } from "@mui/material/styles";

// const useStyles = makeStyles({
//     card: {
//       maxWidth: 345,
//       boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
//       backgroundColor: "#fafafa",
//     },
//   });

function DealerList() {

    const [dealersData, setDealersData] = useState<Dealer[]>([]);
    const {id} = useParams<{id:string}>();
    useEffect(() => {
        axios.get<[]>(`http://localhost:3001/dealer/serviceType/${id}`)
            .then((response: AxiosResponse) => {
                setDealersData(response.data);
            })
    }, []);

    return (
        <>
            <Container sx={{ p: 15}}>
            <Grid container spacing={3}>
                    {dealersData.map((item) => (
                        <Grid item xs={12} sm={4} key={item.dealer_id}>   
                        <Card className="card">
                            <CardContent>
                                <Typography variant="h4" component="div">
                                Dealer Name:{item.name}
                                </Typography>
                                <Typography variant="h5" color="text.secondary">
                                GST Num:{item.gst_no}
                                </Typography>
                                <Typography variant="h5">
                                Vehicle Type {item.Vehicletype.vehicle_type}
                                </Typography>
                                <Typography variant="h5">
                                 Location {item.locality}-{item.city}-{item.state}-{item.pincode}
                                </Typography>
                                <Typography variant="h5">
                                    {item.dealer_history.map((dataItem)=>(
                                    <ul>
                                     <li><Rating name="size-large" value={dataItem.rating} readOnly size="large" /></li>
                                     <li>{dataItem.comments}</li>
                                    </ul>
                                    ))}
                                </Typography>
                                <Typography variant="h5">
                                {item.Services.map((dataItem)=>(
                                    <ul>
                                     <li> {dataItem.discription}</li>
                                     <li>{dataItem.cost}</li>
                                    </ul>
                                    ))}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Book Now</Button>
                            </CardActions>
                        </Card>
                        </Grid>
                    ))}
                </Grid>
                </Container>
    </>
    );
}

export default DealerList;