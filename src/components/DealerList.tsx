import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Dealer } from '../Interfaces/IDealerInterface';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Rating from '@mui/material/Rating';
import { Navbar, Modal, Carousel } from 'react-bootstrap';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Booking from './Booking';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import '../css/dealerlist.css';
import axios from '../BaseURL';
import LoginModal from './Customer/LoginModal';
import useToken from '../useToken';
import { useSelector, useDispatch } from "react-redux";
import { getDealers } from "../actions/dealerAction";
import {RootState} from "../reducers";

function valuetext(value: number) {
    return `${value}RS`;
}

interface dealerProps {
    serviceData: any;
    Id: any;
    SetToken: (val: any) => void;
    Token: any;

}

const DealerList: React.FunctionComponent<dealerProps> = (props): JSX.Element => {

    const [dealersData, setDealersData] = useState<Dealer[]>([]);
    const [filteredData, setFilteredData] = useState<Dealer[]>(dealersData);
    const [selectedDealer, setSelectedDealer] = useState<Dealer>();
    const [showReview, setShowReview] = useState<boolean>(false);
    const [showBook, setShowBook] = useState<boolean>(false);
    const [activeFilter, setactiveFilter] = useState<number[]>([]);
    const [value, setValue] = React.useState<number[]>([250, 3000]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showLogin, setShowLogin] = useState<boolean>(false);
    const state = useSelector((state:RootState) => state.dealerList.dealer);
    console.log('state',state)
    const dispatch = useDispatch();


    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        let result = [];
        result = dealersData.filter((data) => {
            return data.Services.every(dataItem => (dataItem.cost >= value[0] && dataItem.cost <= value[1]));
        });
        setFilteredData(result);
    };
    const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        const value = Number(e.target.value);
        setactiveFilter(prevActiveFilter => {
            let nextActiveFilter = [...prevActiveFilter];
            if (e.target.checked) {
                nextActiveFilter.push(value);
            } else {
                nextActiveFilter = nextActiveFilter.filter((valueItem) => (value != valueItem));
            }
            console.log(nextActiveFilter);
            return nextActiveFilter;
        });
    }

    const LoginHandleClose = () => {
        setShowLogin(false);
    };

    const BookDialog = (dealerItem: Dealer) => {
        if (props.Token == null) {
            setShowLogin(true);
        } else {
            setShowBook(true);
        }
        setSelectedDealer(dealerItem);
    }
    const handleBooking = () => {
        setShowBook(false);
    }

    const ReviewDialog = (dealerItem: Dealer) => {
        setShowReview(!showReview);
        console.log(dealerItem)
        setSelectedDealer(dealerItem);
    }

    useEffect(() => {
        if (props.Id != null) {
            axios.get<[]>(`/dealer/serviceType/${props.serviceData.id}/${props.Id}`)
                .then((response: AxiosResponse) => {
                    setDealersData(response.data);
                    console.log(dealersData);
                    setLoading(true);
                })
        } else {
            axios.get<[]>(`/dealer/serviceType/${props.serviceData.id}`)
                .then((response: AxiosResponse) => {
                    setDealersData(response.data);
                    console.log(response.data)
                    dispatch(getDealers(response.data));
                    setLoading(true);
                })
        }

    }, []);

    useEffect(() => {
        let ratingResult = dealersData;
        activeFilter.forEach((item) => {
            switch (item) {
                case 1:
                    ratingResult = dealersData.filter((dealerData) => {
                        return dealerData.dealer_history.some(dataItem => (dataItem.rating >= 1 && dataItem.rating < 5));
                    });
                    break;
                case 2:
                    ratingResult = dealersData.filter((dealerData) => {
                        return dealerData.dealer_history.some(dataItem => (dataItem.rating >= 2 && dataItem.rating < 5));
                    });
                    break;
                case 3:
                    ratingResult = dealersData.filter((dealerData) => {
                        return dealerData.dealer_history.some(dataItem => (dataItem.rating == 3 && dataItem.rating < 5));
                    });
                    break;
                case 4:
                    ratingResult = dealersData.filter((dealerData) => {
                        return dealerData.dealer_history.some(dataItem => (dataItem.rating == 4 && dataItem.rating < 5));
                    });
                    break;
                case 5:
                    ratingResult = dealersData.filter((dealerData) => {
                        return dealerData.dealer_history.some(dataItem => (dataItem.rating == 5));
                    });
                    break;
                default:
                    ratingResult = dealersData;
                    break;
            };
        });
        setFilteredData(ratingResult);
    }, [activeFilter, dealersData])


    //For Carousel
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: any, e: any) => {
        setIndex(selectedIndex);
    };

    return (
        <div>
            {loading ?
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <td className="filter" style={{ verticalAlign: 'top', width: '30%', border: '1px solid #ddd', backgroundColor: 'white' }}>
                                <table width="100%" style={{ captionSide: 'top', textAlign: 'center' }}>
                                    <caption style={{ textAlign: 'left', border: '1px solid #ddd', padding: '5px' }}><h5>Filters</h5></caption>
                                    <tbody>
                                        <tr style={{ border: '1px solid #ddd' }}>
                                            <td>
                                                PRICE:
                                                <div style={{ margin: '2%', padding: '10px' }}>
                                                    <Slider getAriaLabel={() => 'Price'} value={value} onChange={handleChange} valueLabelDisplay="on" step={50} aria-label="Always visible" getAriaValueText={valuetext} min={250} max={3000} />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr style={{ border: '1px solid #ddd' }}>
                                            <td>
                                                RATING:
                                                <div><Checkbox color="primary" value="5" onChange={(e) => onFilterChange(e)} /><Rating name="size-small" size="small" value={5} readOnly /></div>
                                                <div><Checkbox color="primary" value="4" onChange={(e) => onFilterChange(e)} /><Rating name="size-small" size="small" value={4} readOnly /></div>
                                                <div><Checkbox color="primary" value="3" onChange={(e) => onFilterChange(e)} /><Rating name="size-small" size="small" value={3} readOnly /></div>
                                                <div><Checkbox color="primary" value="2" onChange={(e) => onFilterChange(e)} /><Rating name="size-small" size="small" value={2} readOnly /></div>
                                                <div><Checkbox color="primary" value="1" onChange={(e) => onFilterChange(e)} /><Rating name="size-small" size="small" value={1} readOnly /></div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className="content" style={{ verticalAlign: 'top', width: '100%' }}>
                                <Container>
                                    <div>
                                        {filteredData.map((item) => (
                                            <Grid item key={item.dealer_id}>
                                                <Card className="card">
                                                    <CardContent >
                                                        <div className="flex-container">
                                                            <div style={{ flex: '30%' }}>
                                                                <Carousel activeIndex={index} onSelect={handleSelect}>
                                                                    <Carousel.Item>
                                                                        <img style={{ width: '90%' }}
                                                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDRLpY3p-0UeQAaToiItwtfYehmSa-TSw2Lg&usqp=CAU"
                                                                            alt="slide"
                                                                        />
                                                                    </Carousel.Item>
                                                                </Carousel>
                                                            </div>
                                                            <div style={{ flex: '60%'}}>
                                                                <div className="flex-container">
                                                                    <div style={{flex: '50%'}}>
                                                                        <div style={{ textAlign: 'center' }}>
                                                                            <h4 style={{ textTransform: 'uppercase' }}>{item.name}</h4>
                                                                        </div>
                                                                        <Typography component={'span'} color="text.secondary">
                                                                            GST Num:{item.gst_no} <br />
                                                                            Service available for : {item.Vehicletype.vehicle_type}<br />
                                                                            Location:{item.locality}-{item.city}-{item.state}-{item.pincode}<br />
                                                                            Reviews:<Button size="small" onClick={() => ReviewDialog(item)}>View Reviews</Button>
                                                                        </Typography>
                                                                    </div>
                                                                    <div style={{flex: '30%', textAlign: 'center', padding: '5%' }}>
                                                                        <div style={{height: '100%', padding: '10%' }}>
                                                                            <div style={{ color: 'orangered' }}>
                                                                                {item.Services.map((dataItem) => (
                                                                                    <h1 key={dataItem.service_id}>₹ {dataItem.cost}</h1>
                                                                                ))}
                                                                            </div>
                                                                            <div>
                                                                                <Button variant="contained" size="medium" onClick={() => BookDialog(item)}>Book Now</Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </div>
                                    <div className="navFilter">
                                        <Navbar collapseOnSelect expand="lg" fixed="bottom" bg="light" variant="light">
                                            <Container>
                                                <Navbar.Brand>Filter</Navbar.Brand>
                                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                                <Navbar.Collapse id="responsive-navbar-nav">
                                                    <table width="100%" style={{ captionSide: 'top', textAlign: 'center' }}>
                                                        <caption style={{ textAlign: 'left', border: '1px solid #ddd', padding: '5px' }}><h5>Filters</h5></caption>
                                                        <tbody>
                                                            <tr style={{ border: '1px solid #ddd' }}>
                                                                <td>
                                                                    PRICE:
                                                                    <div style={{ margin: '2%', padding: '10px' }}>
                                                                        <Slider getAriaLabel={() => 'Price'} value={value} onChange={handleChange} valueLabelDisplay="on" step={50} aria-label="Always visible" getAriaValueText={valuetext} min={250} max={3000} />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr style={{ border: '1px solid #ddd' }}>
                                                                <td>
                                                                    RATING:
                                                                    <div><Checkbox color="primary" value="5" onChange={(e) => onFilterChange(e)} /><Rating name="size-small" size="small" value={5} readOnly /></div>
                                                                    <div><Checkbox color="primary" value="4" onChange={(e) => onFilterChange(e)} /><Rating name="size-small" size="small" value={4} readOnly /></div>
                                                                    <div><Checkbox color="primary" value="3" onChange={(e) => onFilterChange(e)} /><Rating name="size-small" size="small" value={3} readOnly /></div>
                                                                    <div><Checkbox color="primary" value="2" onChange={(e) => onFilterChange(e)} /><Rating name="size-small" size="small" value={2} readOnly /></div>
                                                                    <div><Checkbox color="primary" value="1" onChange={(e) => onFilterChange(e)} /><Rating name="size-small" size="small" value={1} readOnly /></div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </Navbar.Collapse>
                                            </Container>
                                        </Navbar>
                                    </div>
                                </Container>
                            </td>
                        </tr>
                    </tbody>
                </table> :
                <Stack sx={{ width: '100%', color: 'grey.500', marginTop: '10%' }} spacing={2}>
                    <LinearProgress color="inherit" />
                    <LinearProgress color="inherit" />
                    <LinearProgress color="inherit" />
                    <LinearProgress color="inherit" />
                </Stack>
            }
            <Modal aria-labelledby="contained-modal-title-vcenter" centered show={showReview} onHide={() => setShowReview(!showReview)}>
                <Modal.Header closeButton style={{ color: 'white', backgroundColor: '#0275d8' }}>Feedback and Comments</Modal.Header>
                <Modal.Body>
                    <div className="divModal">
                        <b>Comments and Reviews:</b>
                        {selectedDealer ?
                            selectedDealer.dealer_history.map((x) => (
                                <ul style={{ listStyleType: 'none' }}>
                                    <li>
                                        <Rating name="size-small" size="small" value={x.rating} readOnly /> - {x.comments}
                                    </li>
                                </ul>
                            ))
                            : null}
                    </div>
                </Modal.Body>
            </Modal>
            <Modal fullscreen aria-labelledby="contained-modal-title-vcenter" centered show={showBook} onHide={handleBooking}>
                <Modal.Header closeButton style={{ color: 'white', backgroundColor: '#0275d8' }}>Booking Details</Modal.Header>
                <Modal.Body style={{backgroundColor:'lightgrey'}}>
                    <div>
                        {selectedDealer ? <Booking SelectedDealer={selectedDealer} serviceData={props.serviceData} handleClose={handleBooking} customerData={props.Token} isHome={false} /> : null}
                    </div>
                </Modal.Body>
            </Modal>
            <LoginModal open={showLogin} handleClose={LoginHandleClose} setToken={props.SetToken} SelectedDealer={selectedDealer} serviceData={props.serviceData} IsLogin={false} isHome={false} />
        </div>
    );
}

export default DealerList;