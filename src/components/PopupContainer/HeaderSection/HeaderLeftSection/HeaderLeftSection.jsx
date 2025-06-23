import React, { useState } from 'react';
import HeaderSectionButton from '../HeaderSectionButtons/HeaderSectionButton';
import { StyledHeaderLeftSection } from './styles';
import BlockedEventsOverlay from '../../BlockedEvents/BlockedEventsOverlay/BlockedEventsOverlay';
import { ReactComponent as MenuIcon } from '../../../../assets/icons/svg/MenuIcon.svg';

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
        IconComponent={MenuIcon} 
        onClick={() => setOverlayVisible(true)} 
      />
      
      {/* Conditionally render the overlay */}
      {isOverlayVisible && (
        <BlockedEventsOverlay onClose={handleOverlayClose} />
      )}
    </StyledHeaderLeftSection>
  );
};

export default HeaderLeftSection;
