import React from 'react';
import { StyledScheduleFeed } from './styles';
import EventCard from '../EventCard/EventCard';
import { useBlockedEvents } from '../../hooks/useBlockedEvents';

const ScheduleFeed = ({ schedule }) => {
  const { isEventBlocked, blockEvent, unblockEvent } = useBlockedEvents();

  if (!schedule || !Array.isArray(schedule.response)) {
    return <p>Loading...</p>; 
  }

  const handleBlockEvent = (eventId, eventData) => {
    blockEvent(eventId, eventData);
  };

  return (
    <StyledScheduleFeed>
      {schedule.response.map((game, index) => {
        const isBlocked = isEventBlocked(game.id);
        return (
          <EventCard
            key={index}
            event={game}
            isBlocked={isBlocked}
            onBlockEvent={handleBlockEvent}
            onUnblockEvent={unblockEvent}
          />
        );
      })}
    </StyledScheduleFeed>
  );
};

export default ScheduleFeed;
