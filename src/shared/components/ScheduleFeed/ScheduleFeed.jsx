import React from 'react';
import { StyledScheduleFeed } from './styles';
import EventCard from '../EventCard/EventCard';

const ScheduleFeed = ({ schedule }) => {

  if (!schedule || !Array.isArray(schedule.response)) {
    return <p>Loading...</p>; 
  }

  return (
    <StyledScheduleFeed>
      {schedule.response.map((game, index) => (
        <EventCard
          key={index}
          event={game}
        />
      ))}
    </StyledScheduleFeed>
  );
};

export default ScheduleFeed;
