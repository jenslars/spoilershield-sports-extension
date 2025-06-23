import React, { useState, useEffect } from 'react';
import { StyledBlockedEventsOverlay, StyledCloseButton, StyledHeader, StyledHeaderTitle } from './styles';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/svg/CloseIcon.svg';
import BlockedEvent from './BlockedEvent/BlockedEvent';
import { getBlockedEventDetails } from '../../../../utils/localStorage/saveSpoilerData';

const BlockedEventsOverlay = ({ onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  const blockedEvents = getBlockedEventDetails();

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(); 
    }, 300); 
  };

  useEffect(() => {
    return () => {
      setIsExiting(false);
    };
  }, []);

  return (
    <StyledBlockedEventsOverlay isExiting={isExiting}>
      <StyledHeader>
        <StyledCloseButton onClick={handleClose}>
          <CloseIcon />
        </StyledCloseButton>
        <StyledHeaderTitle>
          Currently Hidden Events
        </StyledHeaderTitle>
      </StyledHeader>
      {blockedEvents && blockedEvents.length > 0 ? (
        blockedEvents.map((event) => (
          <BlockedEvent
            key={event.id}
            sport={event.sport}
            id={event.id}
            startDate={event.startDate}
            startTime={event.startTime}
            homeTeamName={event.homeTeamName}
            visitorsTeamName={event.visitorsTeamName}
          />
        ))
      ) : (
        <p>No blocked events found.</p>
      )}
    </StyledBlockedEventsOverlay>
  );
};

export default BlockedEventsOverlay;
