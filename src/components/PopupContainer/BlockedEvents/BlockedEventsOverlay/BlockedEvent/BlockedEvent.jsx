import React from "react";
import { StyledBlockedEvent, StyledDeleteButton, StyledEventSection, StyledRemoveSection, StyledLogoSection, StyledCompetitors, StyledStartDate, StyledStartTime } from "./styles";
import { ReactComponent as DeleteIcon } from '../../../../../assets/icons/svg/DeleteIcon.svg';
import { ReactComponent as NBALogo } from '../../../../../assets/sportLogos/nba.svg';
import { ReactComponent as F1Logo } from '../../../../../assets/sportLogos/f1.svg';
import { removeBlockedEvent } from "../../../../../utils/localStorage/saveSpoilerData";

const BlockedEvent = ({ sport, id, startDate, startTime, homeTeamName, visitorsTeamName, onRemove }) => {
  const sportsLogos = {
    nba: { Component: NBALogo, width: "24px", height: "55px" },
    f1: { Component: F1Logo, width: "60px", height: "15px" },
  };

  const sportLogo = sportsLogos[sport];

  const RemoveEvent = () => {
    removeBlockedEvent(id);
    onRemove(id);
  };

  return (
    <StyledBlockedEvent>
      <StyledLogoSection>
        {sportLogo ? (
          <sportLogo.Component
            width={sportLogo.width}
            height={sportLogo.height}
          />
        ) : (
          <div>No Logo</div>
        )}
      </StyledLogoSection>
      <StyledEventSection>
        <StyledCompetitors>
          {homeTeamName} - {visitorsTeamName}
        </StyledCompetitors>
        <StyledStartTime>{startTime}</StyledStartTime>
        <StyledStartDate>{startDate}</StyledStartDate>
      </StyledEventSection>
      <StyledRemoveSection>
        <StyledDeleteButton onClick={RemoveEvent}>
          <DeleteIcon />
        </StyledDeleteButton>
      </StyledRemoveSection>
    </StyledBlockedEvent>
  );
};

export default BlockedEvent;
