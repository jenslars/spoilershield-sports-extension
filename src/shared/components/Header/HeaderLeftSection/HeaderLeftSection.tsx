import React, { useState } from 'react';
import IconButton from '../../IconButton/IconButton';
import ListCheckedIcon from '../../../../assets/icons/svg/ListCheckedIcon.svg';
import SlidingPanel from '../../SlidingPanel/SlidingPanel';
import BlockedEventsList from '../../BlockedEventsList/BlockedEventsList';

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
        label="Blocked Events"
      >
        <BlockedEventsList />
      </SlidingPanel>
    </>
  );
};

export default HeaderLeftSection; 