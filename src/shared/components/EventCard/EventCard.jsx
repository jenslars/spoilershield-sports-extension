import React from "react";
import {
    StyledEventContainer,
    StyledTime,
    StyledEventDetails,
    StyledAsideSection,
    StyledBlockButton,
    StyledLeftSection,
    BlockedEventOverlay,
    BlockedButtonOverlay
} from './styles';
import HeadToHeadSection from "./HeadToHeadSection/HeadToHeadSection";
import MultiCompetitorSection from "./MultiCompetitorSection/MultiCompetitorSection";

import { fetchPlayerData } from "../../utils/api/nba_schedule_api";
import { saveGameData } from "../../utils/localStorage/saveSpoilerData";
import VisibilityOffIcon from '../../../assets/icons/svg/VisibilityOffIcon.svg';
import { useSpoilerData } from '../../hooks/useSpoilerData';

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

const EventCard = ({ event, isBlocked, onBlockEvent, onUnblockEvent }) => {
    const { fetchSpoilerData, isLoading } = useSpoilerData();
    
    const isHeadToHead = event.isHeadToHead;
    const startTime = new Date(event.date.start).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
    const startDate = new Date(event.date.start).toLocaleDateString();

    // Handle block button click
    const handleBlockClick = async () => {
        if (isBlocked) {
            // Unblock the event
            onUnblockEvent(event.id);
            console.log(`Event ${event.id} unblocked`);
            return;
        }
        
        // Block the event with full event data
        onBlockEvent(event.id, event);
        
        // Fetch spoiler data
        const result = await fetchSpoilerData(event.id);
        if (result.success) {
            console.log('Spoiler data fetched successfully:', result.data);
            // TODO: Handle the spoiler data (save to localStorage, etc.)
        } else {
            console.error('Failed to fetch spoiler data:', result.error);
        }
    };

    // Render event details as a single line, separated by ' | '
    const renderEventDetailsLine = () => {
        if (!event.eventDetails) return null;
        // Get all non-empty values
        const values = Object.values(event.eventDetails).filter(v => v && v.trim() !== '');
        if (values.length === 0) return null;
        return values.join(' | ');
    };

    return (
        <StyledEventContainer>
            <BlockedEventOverlay className={isBlocked ? 'active' : ''} />
            {/* Header: Contains Logo of Competition*/}
            <StyledLeftSection>
                {/* Header: Contains Logo of Competition*/}
                <div style={{ display: 'flex', alignItems: 'center', height: 17, marginTop: '10px' }}>
                    {event.competitionImage && (
                        <img 
                            src={event.competitionImage} 
                            alt={event.sport} 
                            style={{ height: 17, width: 'auto' }} 
                        />
                    )}
                </div>
                {/* Middle section: head-to-head or multi-competitor */}
                <div className="event-middle-section">
                    {isHeadToHead ? (
                        <HeadToHeadSection teams={event.teams}/>
                    ) : (
                        <MultiCompetitorSection
                            title={event.eventTitle}
                            image={event.eventImage}
                            description={event.eventDescription}
                        />
                    )}
                </div>
                {/* Event Details:  Venue, Type, Value */}
                <StyledEventDetails>
                    {renderEventDetailsLine()}
                </StyledEventDetails>
            </StyledLeftSection>
            {/* Right side section: Time, Block button */}
            <StyledAsideSection>
                <StyledTime>
                    {startTime}
                </StyledTime>
                <StyledBlockButton 
                    onClick={handleBlockClick}
                    disabled={isLoading}
                >
                    <BlockedButtonOverlay className={isBlocked ? 'active' : ''}>
                        {isBlocked && "Blocked"}
                    </BlockedButtonOverlay>
                    <VisibilityOffIcon 
                        width={14} 
                        height={14} 
                        style={{ 
                            margin: '2px 6px 0 8px', 
                            fill: '#FFFFFF'
                        }} 
                    />
                    Block
                </StyledBlockButton>
            </StyledAsideSection>
        </StyledEventContainer>
    );
};

export default EventCard;
