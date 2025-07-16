import React from 'react';
import IconButton from '../../IconButton/IconButton';
import CalendarIcon from '../../../../assets/icons/svg/CalendarIcon.svg';
import OptionsVertIcon from '../../../../assets/icons/svg/OptionsVertIcon.svg';
import PickerWithButtonField from '../DateCalendar/DateCalendar';

const HeaderRightSection: React.FC = () => {
  const handleClickA = () => {
    console.log("Button A clicked!");
  };

  const handleClickB = () => {
    console.log("Button B clicked!");
  };

  return (
    <div className="w-[15%] flex justify-around">
      <IconButton
        icon={CalendarIcon}
        onClick={handleClickA}
        label="Open Calendar"
        size="sm"
        variant="Header"
      />
      <IconButton
        icon={OptionsVertIcon}
        onClick={handleClickB}
        label="Options"
        size="sm"
        variant="Header"
      />
    </div>
  );
};

export default HeaderRightSection; 