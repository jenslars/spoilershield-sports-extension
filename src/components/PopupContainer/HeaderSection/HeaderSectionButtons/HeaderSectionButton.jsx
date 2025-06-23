import React from 'react';
import { StyledButton } from './styles.js';

const HeaderSectionButton = ({ IconComponent, label, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      {IconComponent && <IconComponent />} {/* Render IconComponent if provided */}
    </StyledButton>
  );
};

export default HeaderSectionButton;
