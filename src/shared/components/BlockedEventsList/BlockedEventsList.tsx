import React from 'react';
import EventCard from '../EventCard/EventCard';
import { useBlockedEvents } from '../../hooks/useBlockedEvents';

// Import Event type from EventCard
import type { Event } from '../EventCard/EventCard';

const BlockedEventsList: React.FC = () => {
  const { getAllBlockedEventsData, isEventBlocked, blockEvent, unblockEvent } = useBlockedEvents();
  const blockedEvents = getAllBlockedEventsData() as Event[];

  const handleBlockEvent = (eventId: string, eventData?: Event) => {
    if (eventData) {
      blockEvent(eventId, eventData);
    }
  };

  if (blockedEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 my-8">
        <p className="text-text-secondary font-medium">
          You currently have no blocked events. 
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-4 text-lg font-medium text-text-primary">
        Currently Blocked Events
      </h3>
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
    </div>
  );
};

export default BlockedEventsList; 