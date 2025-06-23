import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function PickerWithButtonField() {
  const [value, setValue] = useState(dayjs());
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button variant="outlined" onClick={handleOpen}>
        {value ? `Current date: ${value.format('MM/DD/YYYY')}` : 'Pick a date'}
      </Button>
      <DatePicker
        open={open}
        onClose={handleClose}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          handleClose();
        }}
        renderInput={({ inputRef, inputProps, InputProps }) => (
          <div ref={inputRef} {...inputProps} />
        )}
      />
    </LocalizationProvider>
  );
}

export default PickerWithButtonField;