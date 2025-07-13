import { useState, useEffect } from 'react';

export const useBlockedEvents = () => {
  const [blockedEvents, setBlockedEvents] = useState<Set<string>>(new Set());
  const [blockedEventsData, setBlockedEventsData] = useState<Map<string, any>>(new Map());

  // Load blocked events from localStorage on mount
  useEffect(() => {
    const savedBlockedEvents = localStorage.getItem('blockedEvents');
    const savedBlockedEventsData = localStorage.getItem('blockedEventsData');
    
    if (savedBlockedEvents) {
      try {
        const parsed = JSON.parse(savedBlockedEvents);
        setBlockedEvents(new Set(parsed));
      } catch (error) {
        console.error('Error loading blocked events:', error);
      }
    }
    
    if (savedBlockedEventsData) {
      try {
        const parsed = JSON.parse(savedBlockedEventsData);
        setBlockedEventsData(new Map(parsed));
      } catch (error) {
        console.error('Error loading blocked events data:', error);
      }
    }
  }, []);

  // Save blocked events to localStorage whenever they change
  useEffect(() => {
    const eventsArray = [...blockedEvents];
    localStorage.setItem('blockedEvents', JSON.stringify(eventsArray));
  }, [blockedEvents]);

  // Save blocked events data to localStorage whenever it changes
  useEffect(() => {
    const eventsDataArray = [...blockedEventsData];
    localStorage.setItem('blockedEventsData', JSON.stringify(eventsDataArray));
  }, [blockedEventsData]);

  const blockEvent = (eventId: string, eventData: any) => {
    setBlockedEvents(prev => new Set([...prev, eventId]));
    setBlockedEventsData(prev => new Map(prev).set(eventId, eventData));
  };

  const unblockEvent = (eventId: string) => {
    setBlockedEvents(prev => {
      const newSet = new Set(prev);
      newSet.delete(eventId);
      return newSet;
    });
    
    setBlockedEventsData(prev => {
      const newMap = new Map(prev);
      newMap.delete(eventId);
      return newMap;
    });
  };

  const isEventBlocked = (eventId: string): boolean => {
    return blockedEvents.has(eventId);
  };

  const getBlockedEvents = (): string[] => {
    return [...blockedEvents];
  };

  const getBlockedEventData = (eventId: string): any => {
    return blockedEventsData.get(eventId);
  };

  const getAllBlockedEventsData = (): any[] => {
    return Array.from(blockedEventsData.values());
  };

  return {
    blockedEvents,
    blockEvent,
    unblockEvent,
    isEventBlocked,
    getBlockedEvents,
    getBlockedEventData,
    getAllBlockedEventsData
  };
}; 