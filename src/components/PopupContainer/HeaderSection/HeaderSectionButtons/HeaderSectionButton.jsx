import React from 'react';
import { StyledButton } from './styles.js';


const HeaderSectionButton = ({ icon, label, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      {icon && <img src={icon} width="20" height="20" />} {/* Display icon if passed */}
      {label}
    </StyledButton>
  );
};

export default HeaderSectionButton;
