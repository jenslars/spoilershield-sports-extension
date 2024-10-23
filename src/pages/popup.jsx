import React from 'react';
import ReactDOM from 'react-dom';
import HeaderSection from '../components/HeaderSection/HeaderSection';

const Popup = () => {
  return (
    <div>
      <HeaderSection/>
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById('root'));