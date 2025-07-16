import React, { useState } from 'react';

const PickerWithButtonField: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div></div>
  );
};

export default PickerWithButtonField; 