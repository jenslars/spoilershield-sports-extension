import { useState } from 'react';
import { spoilerShieldService } from '../utils/api/spoilerShieldService';
import { SpoilersResponse } from '../types/api';

export const useSpoilerData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSpoilerData = async (eventId: string): Promise<SpoilersResponse | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await spoilerShieldService.getSpoilers({ eventId });
      return response;
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching spoiler data:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchSpoilerData,
    isLoading,
    error
  };
}; 