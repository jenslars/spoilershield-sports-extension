import React from 'react';
import HeaderSectionButton from '../HeaderSectionButtons/HeaderSectionButton';
import OptionsIcon from "../../../assets/icons/OptionsIcon.png";
import CalendarIcon from "../../../assets/icons/CalendarIcon.png";

const HeaderRightSection = () => {
  return (
    <div>
      <HeaderSectionButton icon={CalendarIcon} label="Button A" onClick={handleClickA} />
      <HeaderSectionButton icon={OptionsIcon} label="Button B" onClick={handleClickB} />
    </div>
  );
};

export default HeaderRightSection;