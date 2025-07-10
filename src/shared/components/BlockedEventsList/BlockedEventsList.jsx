import React from 'react';
import { StyledBlockedEventsList } from './styles';
import EventCard from '../EventCard/EventCard';
import { useBlockedEvents } from '../../hooks/useBlockedEvents';

const BlockedEventsList = () => {
  const { getAllBlockedEventsData, isEventBlocked, blockEvent, unblockEvent } = useBlockedEvents();
  
  const blockedEvents = getAllBlockedEventsData();

  const handleBlockEvent = (eventId, eventData) => {
    blockEvent(eventId, eventData);
  };

  if (blockedEvents.length === 0) {
    return (
      <StyledBlockedEventsList>
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          No blocked events found.
        </div>
      </StyledBlockedEventsList>
    );
  }

  return (
    <StyledBlockedEventsList>
      <h3 style={{ marginBottom: '16px', color: '#333' }}>Blocked Events ({blockedEvents.length})</h3>
      {blockedEvents.map((event, index) => {
        const isBlocked = isEventBlocked(event.id);
        return (
          <EventCard
            key={`${event.id}-${index}`}
            event={event}
            isBlocked={isBlocked}
            onBlockEvent={handleBlockEvent}
            onUnblockEvent={unblockEvent}
          />
        );
      })}
    </StyledBlockedEventsList>
  );
};

export default BlockedEventsList; 