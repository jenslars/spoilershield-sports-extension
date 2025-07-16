import React from "react";
import { tv } from 'tailwind-variants';
import HeadToHeadSection from "./HeadToHeadSection/HeadToHeadSection";
import MultiCompetitorSection from "./MultiCompetitorSection/MultiCompetitorSection";
import VisibilityOffIcon from "../../../assets/icons/svg/VisibilityOffIcon.svg"
import { useSpoilerData } from '../../hooks/useSpoilerData';

// Define component variants using tailwind-variants
const eventCardVariants = tv({
  slots: {
    container: [
      "relative overflow-hidden w-full h-[99px] rounded-lg mt-[5px] flex flex-row shadow-sm transition-all duration-200",
      "bg-surface hover:shadow-md"
    ],
    leftSection: [
      "relative z-10 flex flex-col w-2/3 ml-[10px] justify-between"
    ],
    eventDetails: [
      "flex flex-row items-center gap-2 text-[8px] whitespace-nowrap overflow-hidden text-ellipsis font-light mb-[10px]",
      "text-text-tertiary"
    ],
    asideSection: [
      "relative z-10 flex flex-col items-center justify-center gap-2 w-1/3 font-normal"
    ],
    time: [
      "text-[22px] mb-[-5px]",
      "text-text-primary"
    ],
    blockButton: [
      "relative overflow-hidden h-[25px] w-[75px] flex items-center rounded-full text-[14px] font-normal cursor-pointer select-none shadow-sm transition-all duration-300",
      "bg-interactive hover:bg-interactive-hover text-white hover:shadow-lg"
    ],
    blockedOverlay: [
      "absolute top-0 left-0 w-0 h-full rounded-card z-0 pointer-events-none transition-all duration-500",
      "bg-surface-overlay"
    ],
    buttonOverlay: [
      "absolute top-0 left-0 w-0 h-full rounded-button flex items-center justify-center text-white text-[14px] font-normal z-[2] pointer-events-none transition-all duration-500",
      "bg-interactive"
    ]
  },
  variants: {
    isBlocked: {
      true: {
        blockedOverlay: "w-full",
        buttonOverlay: "w-full"
      },
      false: {}
    }
  }
});

interface Team {
  id: string;
  name: string;
  nickname: string;
  code: string;
  logo: string;
}

interface EventDetails {
  eventDetailVenue: string;
  eventDetailType: string;
  eventDetailValue: string;
}

interface HeadToHeadEvent {
  id: string;
  isHeadToHead: true;
  sport: string;
  competitionImage: string;
  date: { start: string };
  teams: {
    home: Team;
    visitors: Team;
  };
  eventDetails: EventDetails;
}

interface MultiCompetitorEvent {
  id: string;
  isHeadToHead: false;
  sport: string;
  competitionImage: string;
  date: { start: string };
  eventTitle: string;
  eventImage: string;
  eventDescription: string;
  eventDetails: EventDetails;
}

type Event = HeadToHeadEvent | MultiCompetitorEvent;

interface EventCardProps {
  event: Event;
  isBlocked: boolean;
  onBlockEvent: (id: string, event?: Event) => void;
  onUnblockEvent: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, isBlocked, onBlockEvent, onUnblockEvent }) => {
  const { fetchSpoilerData, isLoading } = useSpoilerData();
  const { container, leftSection, eventDetails, asideSection, time, blockButton, blockedOverlay, buttonOverlay } = eventCardVariants({ isBlocked });
  
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
    <div className={container()}>
      <div className={blockedOverlay()} />
      {/* Header: Contains Logo of Competition*/}
      <div className={leftSection()}>
        {/* Header: Contains Logo of Competition*/}
        <div className="flex items-center h-[17px] mt-[10px]">
          {event.competitionImage && (
            <img 
              src={event.competitionImage} 
              alt={event.sport} 
              className="h-[17px] w-auto" 
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
        <div className={eventDetails()}>
          {renderEventDetailsLine()}
        </div>
      </div>
      {/* Right side section: Time, Block button */}
      <div className={asideSection()}>
        <div className={time()}>
          {startTime}
        </div>
        <div 
          className={blockButton()}
          onClick={handleBlockClick}
          style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
        >
          <div className={buttonOverlay()}>
            {isBlocked && "Blocked"}
          </div>
          <VisibilityOffIcon 
            width={14} 
            height={14} 
            className="m-[2px_6px_0_8px] fill-white" 
          />
          Block
        </div>
      </div>
    </div>
  );
};

export default EventCard; 