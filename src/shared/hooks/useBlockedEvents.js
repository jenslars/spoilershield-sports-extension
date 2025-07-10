import { useState, useEffect } from 'react';

export const useBlockedEvents = () => {
  const [blockedEvents, setBlockedEvents] = useState(new Set());
  const [blockedEventsData, setBlockedEventsData] = useState(new Map());

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

  const blockEvent = (eventId, eventData) => {
    setBlockedEvents(prev => new Set([...prev, eventId]));
    setBlockedEventsData(prev => new Map(prev).set(eventId, eventData));
  };

  const unblockEvent = (eventId) => {
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

  const isEventBlocked = (eventId) => {
    return blockedEvents.has(eventId);
  };

  const getBlockedEvents = () => {
    return [...blockedEvents];
  };

  const getBlockedEventData = (eventId) => {
    return blockedEventsData.get(eventId);
  };

  const getAllBlockedEventsData = () => {
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