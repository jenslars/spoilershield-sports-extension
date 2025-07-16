import React, { useState } from 'react';
import IconButton from '../../IconButton/IconButton';
import ListCheckedIcon from '../../../../assets/icons/svg/ListCheckedIcon.svg';
import SlidingPanel from '../../SlidingPanel';

const HeaderLeftSection: React.FC = () => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  // Handle closing the overlay
  const handleOverlayClose = () => {
    setOverlayVisible(false);
  };

  return (
    <>
      <div className="w-[15%] flex justify-around">
        {/* Button to open the overlay */}
        <IconButton
          icon={ListCheckedIcon}
          onClick={() => setOverlayVisible(true)}
          label="Show Blocked Events"
          size="sm"
          variant="Header"
        />
      </div>
      
      {/* Sliding Panel */}
      <SlidingPanel 
        direction="left" 
        isOpen={isOverlayVisible}
        onClose={handleOverlayClose}
      >
        <div>
          <h2>Blocked Events</h2>
          <p>This is the content that will slide in from the left.</p>
          <button onClick={handleOverlayClose}>Close</button>
        </div>
      </SlidingPanel>
    </>
  );
};

export default HeaderLeftSection; 