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
import { Nav, Navbar, Modal, Carousel } from 'react-bootstrap';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Booking from './Booking';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import '../css/dealerlist.css';
import axios from '../BaseURL';

function valuetext(value: number) {
    return `${value}RS`;
}

interface dealerProps {
    id: number,
}

const DealerList: React.FunctionComponent<dealerProps> = (props): JSX.Element => {

    const [dealersData, setDealersData] = useState<Dealer[]>([]);
    const [filteredData, setFilteredData] = useState<Dealer[]>(dealersData);

    const [showReview, setShowReview] = useState<boolean>(false);
    const [showBook, setShowBook] = useState<boolean>(false);
    // const { id } = useParams<{ id: string }>();
    const [activeFilter, setactiveFilter] = useState<number[]>([]);

    const [value, setValue] = React.useState<number[]>([0, 5]);

    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        let result = [];
        result = dealersData.filter((data) => {
            return data.Services.filter(dataItem => (dataItem.cost >= value[0] && dataItem.cost <= value[1]));
        });
        setFilteredData(result);
    };
    const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let data = activeFilter;
        activeFilter.push(Number(e.target.value));
        setactiveFilter(data);
        let result = [];
        result = dealersData.filter((data) => {

        })
        console.log(activeFilter);
    }

    const onPriceMinChange = () => {

    }

    const onPriceMaxChange = () => {

    }

    useEffect(() => {
        axios.get<[]>(`/dealer/serviceType/${props.id}`)
            .then((response: AxiosResponse) => {
                setDealersData(response.data);
                setLoading(true);
                //setFilteredData(response.data);
            })
    }, []);

     //For Carousel
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: any, e: any) => {
        setIndex(selectedIndex);
    };

    return (
        <div>
            {loading ?
                <table>
                    <tr>
                        <td className="filter" style={{ verticalAlign: 'top', width: '20%', border: '1px solid #ddd', backgroundColor: 'white' }}>
                            <table width="100%" style={{ captionSide: 'top', textAlign: 'center' }}>
                                <caption style={{ textAlign: 'left', border: '1px solid #ddd', padding: '5px' }}><h5>Filters</h5></caption>
                                <tr style={{ border: '1px solid #ddd' }}>
                                    <td>
                                        PRICE:
                                        <div style={{ margin: '2%', padding: '10px' }}>
                                            <Slider getAriaLabel={() => 'Price'} value={value} onChange={handleChange} valueLabelDisplay="auto" getAriaValueText={valuetext} min={0} max={1000} />
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
                            </table>
                        </td>
                        <td className="content" width='80%'>
                            <Container>
                                <Grid container spacing={4}>
                                    {filteredData.map((item) => (
                                        <Grid item sm={3} key={item.dealer_id}>
                                            <Card className="card">
                                                <CardContent >
                                                    <div>
                                                        <h5>{item.name}</h5>
                                                        <Typography color="text.secondary">
                                                            GST Num:{item.gst_no} <br />
                                                            Service available for : {item.Vehicletype.vehicle_type}
                                                        </Typography>
                                                    </div>
                                                    <div className="cardDiv">
                                                        <b>Location:</b> {item.locality}-{item.city}-{item.state}-{item.pincode}
                                                        {item.Services.map((dataItem) => (
                                                            <ul>
                                                                <li>Discription: {dataItem.discription}</li>
                                                                <li>Price: {dataItem.cost}</li>
                                                            </ul>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small" onClick={() => setShowBook(!showBook)}>Book Now</Button>
                                                    <Button size="small" onClick={() => setShowReview(!showReview)}>Veiw Reviews</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                                <div className="navFilter">
                                    <Navbar collapseOnSelect expand="lg" fixed="bottom" bg="light" variant="light">
                                        <Container>
                                            <Navbar.Brand>Filter</Navbar.Brand>
                                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                            <Navbar.Collapse id="responsive-navbar-nav">
                                                <div className="navDiv">
                                                    <span>Price: </span><input type="number" placeholder="min" onChange={onPriceMinChange}></input> - <input type="number" placeholder="max" onChange={onPriceMaxChange}></input>
                                                </div>
                                                <div className="navDiv">
                                                    <span>Rating: </span><input type="number" defaultValue="1"></input> - <input type="number" defaultValue="5"></input>
                                                </div>
                                            </Navbar.Collapse>
                                        </Container>
                                    </Navbar>
                                </div>
                            </Container>
                        </td>
                    </tr>
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
                        <Carousel activeIndex={index} onSelect={handleSelect}>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJciEIMWzRvBHsRtof3UgG1hOUGX5GsZFo3Q&usqp=CAU"
                                    alt="First slide"
                                />
                                {/* <Carousel.Caption>
                                    <h3>First slide label</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption> */}
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDRLpY3p-0UeQAaToiItwtfYehmSa-TSw2Lg&usqp=CAU"
                                    alt="Second slide"
                                />
                                {/* <Carousel.Caption>
                                    <h3>Second slide label</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption> */}
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCCvsYNrm6G-b3bhsrnnkgk8CQJxgNVz9HsA&usqp=CAU"
                                    alt="Third slide"
                                />
                                {/* <Carousel.Caption>
                                    <h3>Third slide label</h3>
                                    <p>
                                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                    </p>
                                </Carousel.Caption> */}
                            </Carousel.Item>
                        </Carousel>
                        <b>Comments and Reviews:</b>
                        {dealersData.map((item) => (
                            item.dealer_history.map((x) => (
                                <ul style={{ listStyleType: 'none' }}>
                                    <li>
                                        <Rating name="size-small" size="small" value={x.rating} readOnly /> - {x.comments}
                                    </li>
                                </ul>
                            ))
                        ))}
                    </div>
                </Modal.Body>
            </Modal>
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={showBook} onHide={() => setShowBook(!showBook)}>
                <Modal.Header closeButton style={{ color: 'white', backgroundColor: '#0275d8' }}>Booking Details</Modal.Header>
                <Modal.Body>
                    <div className="divModal">
                        <Booking />
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default DealerList;