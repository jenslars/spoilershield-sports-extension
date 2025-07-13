import React from 'react';
import { StyledSlidingPanel, StyledPanelContent } from './styles';

const SlidingPanel = ({ direction, children, isOpen, onClose }) => {
  return (
    <StyledSlidingPanel direction={direction} isOpen={isOpen}>
      <StyledPanelContent>
        {children}
      </StyledPanelContent>
    </StyledSlidingPanel>
  );
};

export default SlidingPanel; 