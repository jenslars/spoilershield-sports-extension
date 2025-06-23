import React from 'react';
import { StyledScheduleFeed } from './styles';
import EventContainer from './EventContainer/EventContainer';

const ScheduleFeed = ({ schedule }) => {
  // Check if schedule and schedule.response are defined and if response is an array
  if (!schedule || !Array.isArray(schedule.response)) {
    return <p>Loading...</p>; // Or any loading indicator you prefer
  }

  return (
    <StyledScheduleFeed>
      {schedule.response.map((game, index) => {
        // Extract the necessary details from each game object
        const { date, teams, season, id } = game;
        const { home, visitors } = teams;

        // Get start time and date
        const startTime = new Date(date.start).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        const startDate = new Date(date.start).toLocaleDateString();

        return (
          <EventContainer
            key={index}
            id={id}
            season={season}
            homeTeamId={home.id}
            homeTeamName={home.name}
            homeTeamNickname={home.nickname}
            homeTeamCode={home.code}
            homeTeamLogo={home.logo}
            visitorsTeamId={visitors.id}
            visitorsTeamName={visitors.name}
            visitorsTeamNickname={visitors.nickname}
            visitorsTeamCode={visitors.code}
            visitorsTeamLogo={visitors.logo}
            startTime={startTime}
            startDate={startDate}
          />
        );
      })}
    </StyledScheduleFeed>
  );
};

export default ScheduleFeed;
