import React, { useState } from 'react';
import IconButton from '../../IconButton/IconButton';
import CalendarIcon from '../../../../assets/icons/svg/CalendarIcon.svg';
import OptionsVertIcon from '../../../../assets/icons/svg/OptionsVertIcon.svg';
import SlidingPanel from '../../SlidingPanel/SlidingPanel';
import SettingsMenu from '../../SettingsMenu/SettingsMenu';

const HeaderRightSection: React.FC = () => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  // Handle closing the overlay
  const handleOverlayClose = () => {
    setOverlayVisible(false);
  };

  const handleClickA = () => {
    console.log("Button A clicked!");
  };

  return (
    <>
      <div className="w-[15%] flex justify-around">
        <IconButton
          icon={CalendarIcon}
          onClick={handleClickA}
          label="Open Calendar"
          size="sm"
          variant="Header"
        />
        <IconButton
          icon={OptionsVertIcon}
          onClick={() => setOverlayVisible(true)}
          label="Options"
          size="sm"
          variant="Header"
        />
      </div>

      {/* Sliding Panel - Settings */}
      <SlidingPanel 
        direction="left" 
        isOpen={isOverlayVisible}
        onClose={handleOverlayClose}
        label="Settings"
      >
          <SettingsMenu />
      </SlidingPanel>
    </>
  );
};

export default HeaderRightSection; 