import React from 'react';
import { Modal } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

type Props = {
    open: boolean;
    handleClose: (val: boolean) => void;
};

function createData(
    name: string,
    address: string,
    vType: string,
    vService: string,
    price: number,
) {
    return {
        name,
        address,
        vType,
        vService,
        price,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: '33091700',
                amount: 1,
            },
        ],
    };
}

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow  style={{backgroundColor:'lightgrey'}} sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell align="center">{row.vType}</TableCell>
                <TableCell align="center">{row.vService}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography style={{textAlign:'center'}} variant="h6" gutterBottom component="div">
                                Booking Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead  style={{backgroundColor:'lightblue'}}>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Booking Id</TableCell>
                                        {/* <TableCell align="center">No.</TableCell> */}
                                        <TableCell align="center">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody style={{backgroundColor:'lightgrey'}}>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            {/* <TableCell align="center">{historyRow.amount}</TableCell> */}
                                            <TableCell  align="center">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const rows = [
    createData('Mahajan Bike Sevice Center', 'Gandhi Nagar, Surat, Gujarat', 'Bike', 'General', 500),
    createData('Balaji Car Sevice Center', 'Nehru Nagar, Alwar, Rajasthan', 'Bike', 'Engine', 2500),
    createData('Gupta Car Sevice Center', 'Tilak Nagar, Bhopal, Madhya Pradesh', 'Bike', 'Premium', 5500),
    createData('Kamal Bike Sevice Center', 'Vyas Nagar, Amritsar, Punjab', 'Bike', 'General', 500),
    createData('Raju Auto Care Sevice Center', 'Danik Nagar, Pune, Maharashtra', 'Bike', 'General', 500),
];

const CustomerBookingHistory: React.FC<Props> = ({ open, handleClose }) => {
    return (
        <div>
            <Modal
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered
                show={open}
                onHide={handleClose}>
                <Modal.Header className='modalHeader' closeButton>
                    Booking History
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead  style={{backgroundColor:'lightblue'}}>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Dealer Name</TableCell>
                                        <TableCell>Dealer Address</TableCell>
                                        <TableCell align='center'>Vehicle</TableCell>
                                        <TableCell align='center'>Service</TableCell>
                                        <TableCell align='center'>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <Row key={row.name} row={row} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default CustomerBookingHistory;