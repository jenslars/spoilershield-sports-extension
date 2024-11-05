import React from 'react';
import HeaderSectionButton from '../HeaderSectionButtons/HeaderSectionButton';
import OptionsIcon from "../../../../assets/icons/OptionsIcon.png";
import CalendarIcon from "../../../../assets/icons/CalendarIcon.png";
import { StyledHeaderRightSection } from './styles';

const HeaderRightSection = () => {
  return (
    <StyledHeaderRightSection>
      <HeaderSectionButton icon={CalendarIcon} onClick={handleClickA} />
      <HeaderSectionButton icon={OptionsIcon} onClick={handleClickB} />
    </StyledHeaderRightSection>
  );
};

const handleClickA = () => {
  console.log("Button A clicked!");
};

const handleClickB = () => {
  console.log("Button B clicked!");
};

export default HeaderRightSection;