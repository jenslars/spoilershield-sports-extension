import React from 'react';
import HeaderSectionButton from '../HeaderSectionButtons/HeaderSectionButton';
import { ReactComponent as CalendarIcon } from '../../../../assets/icons/svg/CalendarIcon.svg';
import { ReactComponent as SettingsIcon } from '../../../../assets/icons/svg/SettingsIcon.svg';
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
        IconComponent={SettingsIcon} 
        onClick={handleClickB} 
      />
    </StyledHeaderRightSection>
  );
};

export default HeaderRightSection;
