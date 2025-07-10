import React from 'react';
import { StyledHeadToHeadSection, StyledCompetitorSection, StyledDividerSection } from './styles';

const HeadToHeadSection = ({ teams }) => (
  <StyledHeadToHeadSection>
    <StyledCompetitorSection>
      <img src={teams.home.logo} alt={teams.home.name} style={{ height: 30 }} />
      <div>{teams.home.name}</div>
    </StyledCompetitorSection>
    <StyledDividerSection>
    -
    </StyledDividerSection>
    <StyledCompetitorSection>
      <img src={teams.visitors.logo} alt={teams.visitors.name} style={{ height: 30 }} />
      <div>{teams.visitors.name}</div>
    </StyledCompetitorSection>
  </StyledHeadToHeadSection>
);

export default HeadToHeadSection; 