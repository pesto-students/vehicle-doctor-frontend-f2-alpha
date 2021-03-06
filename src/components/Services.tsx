import  { useEffect, useState } from 'react';
import { Service } from '../Interfaces/IServiceInterfaces';
import  { AxiosResponse } from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import axios from '../BaseURL';
import DealerListBaseModal from './DealerListBaseModal';
import { Button } from 'react-bootstrap';

type Props ={
    Token:any;
	SetToken:(val:any) => void;
    City:any;
}

const Services : React.FC<Props> =({Token,SetToken,City}) => {
    const [serviceData, setServiceData] = useState<Service[]>([]);
    const [showBook, setShowBook] = useState<boolean>(false);
    const [SelectedServiceData, setSelectedServiceData] = useState<any>({});

    const handleShow = (id:any,serviceName:any) => {
       const data={id,serviceName}
       setSelectedServiceData(data);
        setShowBook(!showBook)
	};

    const DealerListBaseModalhandleClose = () => {
		setShowBook(false);
	}; 
   
    useEffect(() => {
        axios.get<Service[]>('/service/types/GeneralService')
            .then((response: AxiosResponse) => {
                setServiceData(response.data);
            })
    }, []);
    return (
        <>
            <div id="services" style={{ padding: '5%' }} className="anim">
                <div>
                    <h3>OUR SERVICES</h3>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                    {
                        serviceData.map((item, idx) =>
                            <div style={{ margin: '10px' }} key={idx}>
                                <Card>
                                    
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={item.service_image_url}
                                            alt="icon"
                                        />
                                        <CardContent>
                                         <Button variant='warning'  onClick={() => handleShow(`${item.id}`,`${item.service_name}`)}>{item.service_name}</Button>
                                        </CardContent>
                                    
                                </Card>
                            </div>
                        )
                    }
                </div>
            </div>
            <DealerListBaseModal open={showBook} handleClose={DealerListBaseModalhandleClose} serviceData={SelectedServiceData}  Id={null} setToken={SetToken}  token={Token} city={City}/>
            
        </>
    );

}

export default Services;