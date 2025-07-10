import React from 'react';
import HeaderSectionButton from '../HeaderSectionButtons/HeaderSectionButton';
import CalendarIcon from '../../../../assets/icons/svg/CalendarIcon.svg';
import OptionsVertIcon from '../../../../assets/icons/svg/OptionsVertIcon.svg';
import { StyledHeaderRightSection } from './styles';
import PickerWithButtonField from '../DateCalendar/DateCalendar';

const HeaderRightSection = () => {
  const handleClickA = () => {
    console.log("Button A clicked!");
  };

  const handleClickB = () => {
    console.log("Button B clicked!");
  };

  return (
    <StyledHeaderRightSection>
      <HeaderSectionButton 
        IconComponent={CalendarIcon} 
        onClick={handleClickA} 
      />
      <HeaderSectionButton 
        IconComponent={OptionsVertIcon} 
        onClick={handleClickB} 
      />
    </StyledHeaderRightSection>
  );
};

export default HeaderRightSection;
