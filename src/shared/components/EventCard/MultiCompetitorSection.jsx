import React from 'react';

const MultiCompetitorSection = ({ title, image, description, venue, type, value }) => (
  <div className="multi-competitor">
    {image && <img src={image} alt={title} style={{ height: 32, marginBottom: 4 }} />}
    <div className="event-title">{title}</div>
    <div className="event-description">{description}</div>
    <div className="event-venue" style={{ fontSize: 12, color: '#aaa' }}>{venue}</div>
    <div className="event-type-value" style={{ fontSize: 12, color: '#aaa' }}>{type} {value}</div>
  </div>
);

export default MultiCompetitorSection; 