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
import HeadToHeadSection from "./HeadToHeadSection";
import MultiCompetitorSection from "./MultiCompetitorSection";

import { fetchPlayerData } from "../../utils/api/nba_schedule_api";
import { saveGameData } from "../../utils/localStorage/saveSpoilerData";

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
    });

    try {
        const data = await fetchPlayerData(homeTeamId, visitorsTeamId, season);
        console.log("Fetched player data:", data);

        const homeTeamData = Array.isArray(data?.homeTeamData) ? data.homeTeamData : [];
        const awayTeamData = Array.isArray(data?.awayTeamData) ? data.awayTeamData : [];

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

const EventCard = ({ event }) => {
    const isHeadToHead = event.isHeadToHead;
    const startTime = new Date(event.date.start).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
    const startDate = new Date(event.date.start).toLocaleDateString();

    return (
        <StyledEventContainer>
            {/* Header: sport logo, sport name, etc. */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {event.competitionImage && (
                    <img src={event.competitionImage} alt={event.sport} style={{ height: 24 }} />
                )}
                <span style={{ fontWeight: 600 }}>{event.sport}</span>
            </div>
            {/* Middle section: head-to-head or multi-competitor */}
            <div className="event-middle-section">
                {isHeadToHead ? (
                    <HeadToHeadSection teams={event.teams} eventDetails={event.eventDetails} />
                ) : (
                    <MultiCompetitorSection
                        title={event.eventTitle}
                        image={event.eventImage}
                        description={event.eventDescription}
                        venue={event.eventDetailVenue}
                        type={event.eventDetailType}
                        value={event.eventDetailValue}
                    />
                )}
            </div>
            {/* Footer: time, block button, etc. */}
            <StyledTimeSection>
                <StyledTime>{startTime}</StyledTime>
                <HideSpoilersSection>
                    <HideSpoilersButton>Block</HideSpoilersButton>
                </HideSpoilersSection>
            </StyledTimeSection>
        </StyledEventContainer>
    );
};

export default EventCard;
