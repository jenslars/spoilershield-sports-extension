import React, { useState } from 'react';
import HeaderSectionButton from '../HeaderSectionButtons/HeaderSectionButton';
import { StyledHeaderLeftSection } from './styles';
import ListCheckedIcon from '../../../../assets/icons/svg/ListCheckedIcon.svg';

const HeaderLeftSection = () => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  // Handle closing the overlay
  const handleOverlayClose = () => {
    setOverlayVisible(false);
  };

  return (
    <StyledHeaderLeftSection>
      {/* Button to open the overlay */}
      <HeaderSectionButton 
        IconComponent={ListCheckedIcon} 
        onClick={() => setOverlayVisible(true)} 
      />
    </StyledHeaderLeftSection>
  );
};

export default HeaderLeftSection;
