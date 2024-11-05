import React from 'react';
import HeaderSectionButton from '../HeaderSectionButtons/HeaderSectionButton';
import BlockedListIcon from "../../../../assets/icons/BlockedListIcon.png";
import { StyledHeaderLeftSection } from './styles';

const HeaderLeftSection = () => {
  return (
    <StyledHeaderLeftSection>
      <HeaderSectionButton icon={BlockedListIcon} onClick={handleClickC} />
    </StyledHeaderLeftSection>
  );
};

const handleClickC = () => {
  console.log("Button C clicked!");
};

export default HeaderLeftSection;