import React from 'react';
import EventCard from '../EventCard/EventCard';
import { useBlockedEvents } from '../../hooks/useBlockedEvents';

interface Schedule {
  response: any[];
}

interface ScheduleFeedProps {
  schedule: Schedule | null;
}

const ScheduleFeed: React.FC<ScheduleFeedProps> = ({ schedule }) => {
  const { isEventBlocked, blockEvent, unblockEvent } = useBlockedEvents();

  if (!schedule || !Array.isArray(schedule.response)) {
    return <p className="text-text-secondary text-center p-4">Loading...</p>; 
  }

  const handleBlockEvent = (eventId: string, eventData: any) => {
    blockEvent(eventId, eventData);
  };

  return (
    <div className="flex flex-col w-[95%] mx-auto mt-2">
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
    </div>
  );
};

export default ScheduleFeed; 