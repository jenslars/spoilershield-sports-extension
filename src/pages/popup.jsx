import React from 'react';
import ReactDOM from 'react-dom';
import PopupContainer from '../components/PopupContainer/PopupContainer';
import '../styles/globals.css'

const Popup = () => {
  return (
    <div>
      <PopupContainer/>
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById('root'));