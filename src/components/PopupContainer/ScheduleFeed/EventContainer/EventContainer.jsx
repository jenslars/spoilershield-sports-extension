import React from "react";
import {
    StyledEventContainer,
    StyledTeamSection,
    StyledTeamLogo,
    StyledTeamName,
    StyledTimeSection,
    StyledTime,
    StyledDate,
    EventDivider,
    HideSpoilersSection,
    HideSpoilersButton,
    StyledBlockedOverlay,
    StyledOverlayEventDetails,
    StyledCompetitors,
    StyledStartTime,
    StyledStartDate,
    StyledBlockedEventDivider,
    StyledStatus,
    StyledDividerSection
} from './styles';
import { fetchPlayerData } from "../../../../utils/api/nba_schedule_api";
import { saveGameData } from "../../../../utils/localStorage/saveSpoilerData";

const retrieveSpoilerData = async (
    id, 
    startDate, 
    startTime, 
    season, 
    homeTeamId, 
    visitorsTeamId, 
    homeTeamName, 
    homeTeamNickname, 
    homeTeamCode, 
    visitorsTeamName, 
    visitorsTeamNickname, 
    visitorsTeamCode
) => {
    console.log("Parameters:", {
        homeTeamId, visitorsTeamId, season, id,
        homeTeamName, homeTeamNickname, homeTeamCode,
        visitorsTeamName, visitorsTeamNickname, visitorsTeamCode
    }); // Log parameters to check for undefined values

    try {
        const data = await fetchPlayerData(homeTeamId, visitorsTeamId, season);
        console.log("Fetched player data:", data);

        // Check if homeTeamData and awayTeamData exist and are arrays
        const homeTeamData = Array.isArray(data?.homeTeamData) ? data.homeTeamData : [];
        const awayTeamData = Array.isArray(data?.awayTeamData) ? data.awayTeamData : [];

        // Structure game data
        const gameData = {
            id,
            gameDetails: {
                startDate, 
                startTime
            },
            homeTeam: {
                teamName: homeTeamName,
                teamNickname: homeTeamNickname,
                teamCode: homeTeamCode,
                players: homeTeamData.map(player => ({
                    firstname: player.firstname,
                    lastname: player.lastname
                }))
            },
            visitorsTeam: {
                teamName: visitorsTeamName,
                teamNickname: visitorsTeamNickname,
                teamCode: visitorsTeamCode,
                players: awayTeamData.map(player => ({
                    firstname: player.firstname,
                    lastname: player.lastname
                }))
            }
        };
//Fixa till
        saveGameData('nba', gameData);
    } catch (error) {
        console.error('Error loading spoiler data:', error);
    }
};

const EventContainer = ({
    season,
    id,
    homeTeamId,
    homeTeamName,
    homeTeamNickname,
    homeTeamCode,
    homeTeamLogo,
    visitorsTeamId,
    visitorsTeamName,
    visitorsTeamNickname,
    visitorsTeamCode,
    visitorsTeamLogo,
    startTime,
    startDate,
}) => {
    // Define the click handler for the button
    const handleSpoilerButtonClick = () => {
        retrieveSpoilerData(id, startDate, startTime, season, homeTeamId, visitorsTeamId, homeTeamName, homeTeamNickname, homeTeamCode, visitorsTeamName, visitorsTeamNickname, visitorsTeamCode);
    };

    return (
        <StyledEventContainer>
            <StyledBlockedOverlay>
                <StyledOverlayEventDetails>
                    <StyledCompetitors>
                    {homeTeamNickname} - {visitorsTeamNickname}
                    </StyledCompetitors>
                    <StyledStartTime>{startTime}</StyledStartTime>
                    <StyledStartDate>{startDate}</StyledStartDate>
                </StyledOverlayEventDetails>
                <StyledDividerSection>
                    <StyledBlockedEventDivider/>
                </StyledDividerSection>
                <StyledStatus>Spoilers Hidden</StyledStatus>
            </StyledBlockedOverlay>
            <StyledTeamSection>
                <StyledTeamLogo src={homeTeamLogo} alt={homeTeamCode} />
                <StyledTeamName>{homeTeamNickname}</StyledTeamName>
            </StyledTeamSection>
            <StyledTimeSection>
                <StyledTime>{startTime}</StyledTime>
                <StyledDate>{startDate}</StyledDate>
            </StyledTimeSection>
            <StyledTeamSection>
                <StyledTeamLogo src={visitorsTeamLogo} alt={visitorsTeamCode} />
                <StyledTeamName>{visitorsTeamNickname}</StyledTeamName>
            </StyledTeamSection>
            <EventDivider />
            <HideSpoilersSection>
                {/* Pass the click handler to onClick */}
                <HideSpoilersButton onClick={handleSpoilerButtonClick}>Block</HideSpoilersButton>
            </HideSpoilersSection>
        </StyledEventContainer>
    );
};

export default EventContainer;
