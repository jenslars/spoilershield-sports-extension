import { useState, useEffect, useCallback } from 'react';
import { spoilerShieldService } from '../utils/api/spoilerShieldService';
import { ScheduleRequest } from '../types/api';

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

interface Schedule {
  response: Event[];
}

interface MonthYear {
  month: string;
  year: string;
}

export const useSchedule = (apiKey: string | null, date: Date) => {
  const apiKeyLoading = !apiKey;
  const apiKeyError = null;
  const [monthYear, setMonthYear] = useState<MonthYear>({ month: '', year: '' });
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Hardcoded competition slugs for now
  const [selectedSports, setSelectedSports] = useState<string[]>(["national-basketball-association", "formula-one"]);
  const [timezone, setTimezone] = useState<string>(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [competitionIds, setCompetitionIds] = useState<string[]>(["national-basketball-association", "formula-one"]);

  const fetchSchedule = useCallback(async (targetDate: Date, sports: string[], tz: string, comps: string[]) => {
    if (!apiKey) return; // Wait for device registration
    setIsLoading(true);
    setError(null);
    // Removed setTimezone and setCompetitionIds to prevent infinite loop
    try {
      const dateString = targetDate.toISOString().split('T')[0];
      const request = {
        sports,
        date: dateString,
        timezone: tz,
        competitionIds: comps,
        apiKey: apiKey as string
      };
      const response = await spoilerShieldService.getSchedule(request);
      const transformedSchedule = {
        response: response.events.map(event => {
          const baseEvent = {
            id: event.id,
            isHeadToHead: event.isHeadToHead,
            sport: event.sport,
            competitionImage: event.competition.imageUrl,
            date: event.date,
            eventDetails: {
              eventDetailVenue: event.venue || '',
              eventDetailType: event.eventType || '',
              eventDetailValue: event.eventValue || ''
            }
          };
          if (event.isHeadToHead && event.teams) {
            return {
              ...baseEvent,
              teams: {
                home: event.teams.home,
                visitors: event.teams.away
              }
            } as HeadToHeadEvent;
          } else {
            return {
              ...baseEvent,
              eventTitle: event.title,
              eventImage: event.competition.imageUrl,
              eventDescription: event.description || ''
            } as MultiCompetitorEvent;
          }
        })
      };
      setSchedule(transformedSchedule);
    } catch (err: any) {
      setError(err.message);
      setSchedule(null); // Clear schedule on error
      // Do not retry automatically
    } finally {
      setIsLoading(false);
    }
  }, [apiKey]);

  useEffect(() => {
    if (!apiKey) return; // Wait for device registration
    const updateMonthYear = (date: Date) => {
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear().toString();
      setMonthYear({ month, year });
    };
    updateMonthYear(date);
    fetchSchedule(date, selectedSports, timezone, competitionIds);
    // No retry logic here; only fetch once per dependency change
  }, [date, selectedSports, timezone, competitionIds, fetchSchedule, apiKey]);

  const handleSportsChange = (sports: string[]) => {
    setSelectedSports(sports);
  };
  const handleTimezoneChange = (tz: string) => setTimezone(tz);
  const handleCompetitionIdsChange = (ids: string[]) => setCompetitionIds(ids);

  return {
    monthYear,
    schedule,
    selectedSports,
    handleSportsChange,
    timezone,
    setTimezone: handleTimezoneChange,
    competitionIds,
    setCompetitionIds: handleCompetitionIdsChange,
    isLoading,
    error,
    refetch: () => fetchSchedule(date, selectedSports, timezone, competitionIds),
    apiKey,
    apiKeyLoading,
    apiKeyError
  };
}; 