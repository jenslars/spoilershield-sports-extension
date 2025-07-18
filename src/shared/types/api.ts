// Base API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
  rateLimit?: RateLimitInfo;
}

// Rate limiting types
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp when limit resets
  retryAfter?: number; // Seconds to wait before retry
}

// Authentication types
export interface ApiKey {
  key: string;
  deviceId: string;
  createdAt: number;
  lastUsed: number;
  version: string;
}

export interface DeviceFingerprint {
  userAgent: string;
  screenResolution: string;
  timezone: string;
  language: string;
  platform: string;
  extensionVersion: string;
}

// Schedule API types
export interface ScheduleRequest {
  sports: string[];
  date: string; // ISO date string (YYYY-MM-DD)
}

export interface ScheduleEvent {
  id: string;
  sport: string;
  competition: {
    id: string;
    name: string;
    imageUrl: string;
  };
  date: {
    start: string; // ISO datetime string
    end?: string; // ISO datetime string
  };
  title: string;
  description?: string;
  venue?: string;
  isHeadToHead: boolean;
  teams?: {
    home: Team;
    away: Team;
  };
  eventType?: string; // e.g., "Regular Season", "Playoffs", "Qualifying"
  eventValue?: string; // e.g., "Game 2", "Round 18"
}

export interface Team {
  id: string;
  name: string;
  nickname: string;
  code: string;
  logo?: string;
}

export interface ScheduleResponse {
  events: ScheduleEvent[];
  totalCount: number;
}

// Competitions API types
export interface Sport {
  id: string;
  name: string;
}

export interface Competition {
  id: string;
  name: string;
  imageUrl: string;
}

export interface SportWithCompetitions {
  sport: Sport;
  competitions: Competition[];
}

export interface CompetitionsResponse {
  sports: SportWithCompetitions[];
}

// Spoilers API types
export interface SpoilerRequest {
  eventId: string;
}

export interface Spoiler {
  id: string;
  text: string;
  type: 'score' | 'result' | 'highlight' | 'injury' | 'other';
  severity: 'low' | 'medium' | 'high';
}

export interface SpoilersResponse {
  eventId: string;
  spoilers: Spoiler[];
  totalCount: number;
}

// Report Issue API types
export interface ReportIssueRequest {
  description: string; // Required
  device?: string;
  browser?: string;
  website?: string;
  file?: File | Blob;
}

export interface ReportIssueResponse {
  id: string;
  status: 'submitted' | 'in_progress' | 'resolved';
  submittedAt: string;
}

// Error types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// Rate limit error
export interface RateLimitError extends ApiError {
  code: 'RATE_LIMIT_EXCEEDED';
  retryAfter: number;
} 