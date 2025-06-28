import React from 'react';

const HeadToHeadSection = ({ teams, eventDetails }) => (
  <div className="head-to-head">
    <div className="team home">
      <img src={teams.home.logo} alt={teams.home.name} style={{ height: 32 }} />
      <div>{teams.home.name}</div>
    </div>
    <span style={{ margin: '0 8px' }}>vs</span>
    <div className="team away">
      <img src={teams.visitors.logo} alt={teams.visitors.name} style={{ height: 32 }} />
      <div>{teams.visitors.name}</div>
    </div>
    {eventDetails && (
      <div className="event-details" style={{ marginTop: 8, fontSize: 12, color: '#aaa' }}>
        <div>{eventDetails.eventDetailVenue}</div>
        <div>{eventDetails.eventDetailType} {eventDetails.eventDetailValue}</div>
      </div>
    )}
  </div>
);

export default HeadToHeadSection; 