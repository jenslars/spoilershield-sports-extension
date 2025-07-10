import React from 'react';
import { StyledMultiCompetitorSection, StyledEventHeader, StyledEventDescription } from './styles';

const MultiCompetitorSection = ({ title, image, description, venue, type, value }) => (
  <StyledMultiCompetitorSection>
    <StyledEventHeader>
      <div className="event-title">{title}</div>
      {image && <img src={image} alt={title} />}
    </StyledEventHeader>
    <StyledEventDescription>
      {description}
    </StyledEventDescription>
  </StyledMultiCompetitorSection>
);

export default MultiCompetitorSection; 