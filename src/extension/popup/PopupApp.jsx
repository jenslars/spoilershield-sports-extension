import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from '../../views/LandingPage/LandingPage.jsx';
import '../../shared/styles/globals.css'
import { StyledPopup } from './styles';

const Popup = () => {
  return (
    <StyledPopup>
      <LandingPage/>
    </StyledPopup>
  );
};

ReactDOM.render(<Popup />, document.getElementById('root'));