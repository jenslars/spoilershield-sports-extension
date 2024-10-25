import React from 'react';
import HeaderSection from './HeaderSection/HeaderSection'
import { StyledPopupContainer } from './styles';

const PopupContainer = () => {
    return (
      <StyledPopupContainer >
        <HeaderSection/>
      </StyledPopupContainer>
    );
  };

export default PopupContainer;