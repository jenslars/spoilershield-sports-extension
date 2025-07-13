// Event types
export interface Event {
  id: string;
  date: {
    start: string;
  };
  sport: string;
  competitionImage?: string;
  isHeadToHead: boolean;
  teams?: Team[];
  eventTitle?: string;
  eventImage?: string;
  eventDescription?: string;
  eventDetails?: Record<string, string>;
}

export interface Team {
  name: string;
  nickname: string;
  code: string;
  id: string;
}

// Component props
export interface EventCardProps {
  event: Event;
  isBlocked: boolean;
  onBlockEvent: (id: string, event?: Event) => void;
  onUnblockEvent: (id: string) => void;
}

// API types
export interface PlayerData {
  firstname: string;
  lastname: string;
}

export interface GameData {
  id: string;
  gameDetails: {
    startDate: string;
    startTime: string;
  };
  homeTeam: {
    teamName: string;
    teamNickname: string;
    teamCode: string;
    players: PlayerData[];
  };
  visitorsTeam: {
    teamName: string;
    teamNickname: string;
    teamCode: string;
    players: PlayerData[];
  };
}
