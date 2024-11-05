import React from 'react';

const ScheduleFeed = ({ schedule, date }) => {
  return (
    <div>
      <h2>Schedule for {date.toDateString()}</h2>
      {schedule.length === 0 ? (
        <p>No games scheduled for this date.</p>
      ) : (
        schedule.map((game, index) => (
          <div key={index}>
            {/* Customize how you display each game's details */}
            <p>{game.name}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ScheduleFeed;
