import React, { useState } from 'react';
import { cities } from '../jsonfile/cities.json';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Modal } from 'react-bootstrap';

type Props = {
  open: boolean;
  handleClose: (val: boolean) => void;
  onCitySelected:(val:any) =>void;
}

const CityModal: React.FC<Props> = ({ open, handleClose,onCitySelected }) => {

  const handleChange = (event: any, newValue: any): void => {
    if (newValue != null) {
      const val = newValue.name;
      onCitySelected(val);
      handleClose(true);
    }
  }
  return (
    <>
      <Modal
        aria-labelledby='contained-modal-title-vcenter'
        centered
        backdrop='static'
        keyboard={false}
        contentClassName='modal20w'
        show={open}
        onHide={handleClose}>
        <Modal.Header style={{ color: 'white', backgroundColor: '#0d6efd' }} closeButton>
          Select City
        </Modal.Header>
        <Modal.Body>
          <div>
            <Autocomplete
              disablePortal
              onChange={handleChange}
              style={{ backgroundColor: 'white' }}
              options={cities}
              getOptionLabel={(option) => option.name}
              autoHighlight
              sx={{ width: 300 }}
              renderInput={(params) => <TextField variant="filled" {...params} label='Please Select your City' />}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CityModal;