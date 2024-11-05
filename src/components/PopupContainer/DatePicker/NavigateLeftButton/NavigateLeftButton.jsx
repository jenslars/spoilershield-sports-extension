import React from 'react';
import leftArrow from '../../../../assets/icons/left-arrow-blue.png';
import { StyledNagivateLeftButton } from './styles';

const NavigateLeftButton = ({ onClick }) => (
  <StyledNagivateLeftButton onClick={onClick} aria-label="Next Month">
    <img src={leftArrow} alt="Next" style={{ width: '20px', height: '20px' }} /> {/* Custom image */}
  </StyledNagivateLeftButton>
);

export default NavigateLeftButton;
