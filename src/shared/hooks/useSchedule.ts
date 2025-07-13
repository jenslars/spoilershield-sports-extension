import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const updateMonthYear = (date: Date) => {
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear().toString();
      setMonthYear({ month, year });
    };

    updateMonthYear(date);

    // Hardcoded schedule data
    setSchedule({
      response: [
        {
          id: '1',
          isHeadToHead: true,
          sport: 'NBA',
          competitionImage: 'https://cdn.brandfetch.io/idFBraEt77/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B',
          date: { start: new Date(Date.now() + 3600 * 1000).toISOString() },
          teams: {
              home: {
                id: '10',
                name: 'Raptors',
                nickname: 'Raptors',
                code: 'TOR',
                logo: 'https://upload.wikimedia.org/wikipedia/en/3/36/Toronto_Raptors_logo.svg',
              },
              visitors: {
                id: '20',
                name: 'Lakers',
                nickname: 'Lakers',
                code: 'LAL',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg',
              },
            },
          eventDetails: {
            eventDetailVenue: 'Scotiabank Arena',
            eventDetailType: 'Playoffs',
            eventDetailValue: 'Game 2'
          }
        },
        {
          id: '2',
          isHeadToHead: true,
          sport: 'NBA',
          competitionImage: 'https://cdn.brandfetch.io/idFBraEt77/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B',
          date: { start: new Date(Date.now() + 3600 * 1000).toISOString() },
          teams: {
            home: {
              id: '30',
              name: 'Bulls',
              nickname: 'Bulls',
              code: 'CHI',
              logo: 'https://upload.wikimedia.org/wikipedia/en/6/67/Chicago_Bulls_logo.svg',
            },
            visitors: {
              id: '40',
              name: 'Celtics',
              nickname: 'Celtics',
              code: 'BOS',
              logo: 'https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg',
            },
          },
          eventDetails: {
            eventDetailVenue: 'United Center',
            eventDetailType: 'Regular Season',
            eventDetailValue: ''
          }
        },
        {
          id: '3',
          isHeadToHead: false,
          sport: 'F1',
          competitionImage: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/F1_%28registered_trademark%29.svg',
          date: { start: new Date(Date.now() + 3600 * 1000).toISOString() },
          eventTitle: 'Bahrain',
          eventImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Bahrain.svg/1200px-Flag_of_Bahrain.svg.png',
          eventDescription: 'FORMULA 1 BAHRAIN GRAND PRIX 2025',
          eventDetails: {
            eventDetailVenue: 'Bahrain International Circuit',
            eventDetailType: 'Qualifying',
            eventDetailValue: 'Round 18'
          }
        }
      ],
    });
  }, [date]);

  const handleDateChange = (newDate: Date) => setDate(newDate);

  return { date, monthYear, schedule, handleDateChange };
}; 