
import { Button, Modal } from 'react-bootstrap';
import RoadSideAssistanceAutoCompleteComponent from '../RoadSideAssistanceAutoCompleteComponent';
import { ROADSIDE_ASSISTANCE } from '../../Constants/common.constant';


type Props = {
    open: boolean;
    handleClose: (val: boolean) => void;
}

const ViewDealer: React.FC<Props> = ({ open, handleClose }) => {
    const handleSubmit = () =>{
        handleClose(true);
    }
    return (
        <>
            <Modal
				aria-labelledby='contained-modal-title-vcenter'
				centered
				show={open}
				onHide={handleClose}>
				<Modal.Header closeButton style={{ color: 'white', backgroundColor: '#d9534f' }}>
					{ROADSIDE_ASSISTANCE}
				</Modal.Header>
				<Modal.Body>
					<div className='divModal'>
						<RoadSideAssistanceAutoCompleteComponent />
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button size='sm' variant='primary' onClick={handleSubmit}>
						Register
					</Button>
				</Modal.Footer>
			</Modal>
        </>
    )
}

export default ViewDealer;