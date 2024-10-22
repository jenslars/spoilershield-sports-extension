import React from 'react';
import ReactDOM from 'react-dom';

const Popup = () => {
  return (
    <div>
      <h1>My Firefox Extension</h1>
      <p>Welcome to my React-based Firefox extension!</p>
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById('root'));