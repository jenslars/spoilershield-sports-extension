import React from 'react';
import rightArrow from '../../../../assets/icons/right-arrow-blue.png';
import { StyledNagivateRightButton } from './styles';

const NavigateRightButton = ({ onClick }) => (
  <StyledNagivateRightButton onClick={onClick} aria-label="Next Month">
    <img src={rightArrow} alt="Next" style={{ width: '20px', height: '20px' }} /> {/* Custom image */}
  </StyledNagivateRightButton>
);

export default NavigateRightButton;
