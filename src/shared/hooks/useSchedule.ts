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

export const useSchedule = () => {
  const [monthYear, setMonthYear] = useState<MonthYear>({ month: '', year: '' });
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSports, setSelectedSports] = useState<string[]>(['NBA', 'F1']); // Default sports

  const fetchSchedule = useCallback(async (targetDate: Date, sports: string[]) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const dateString = targetDate.toISOString().split('T')[0];
      const request: ScheduleRequest = {
        sports,
        date: dateString
      };
      
      const response = await spoilerShieldService.getSchedule(request);
      
      // Transform to your app's format
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
              eventImage: event.competition.imageUrl, // Use competition image as fallback
              eventDescription: event.description || ''
            } as MultiCompetitorEvent;
          }
        })
      };
      
      setSchedule(transformedSchedule);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching schedule:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const updateMonthYear = (date: Date) => {
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear().toString();
      setMonthYear({ month, year });
    };

    updateMonthYear(date);
    fetchSchedule(date, selectedSports);
  }, [date, selectedSports, fetchSchedule]);

  const handleDateChange = (newDate: Date) => setDate(newDate);
  
  const handleSportsChange = (sports: string[]) => {
    setSelectedSports(sports);
  };

  return { 
    date, 
    monthYear, 
    schedule, 
    handleDateChange,
    selectedSports,
    handleSportsChange,
    isLoading, 
    error,
    refetch: () => fetchSchedule(date, selectedSports)
  };
}; 