import React, { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { config } from '../config/environment';
import { spoilerShieldService } from '../utils/api/spoilerShieldService';
import { generateDeviceFingerprint } from '../utils/api/deviceAuth';

const STORAGE_KEY = 'spoilerShieldApiKey';
const EXTENSION_VERSION = '1.0.0';

interface ApiKeyContextType {
  apiKey: string | null;
  loading: boolean;
  error: string | null;
}

const ApiKeyContext = React.createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getOrCreateApiKey() {
      setLoading(true);
      setError(null);

      // Try to get from localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
         
          const fingerprint = parsed.fingerprint || generateDeviceFingerprint();
          // Validate the key with the backend
          try {
            const data = await spoilerShieldService.validateApiKey(parsed.key, fingerprint);
            if (data.valid) {
              setApiKey(parsed.key);
              setLoading(false);
              return;
            }
          } catch (e) {
            // If not valid, clear and re-register
            localStorage.removeItem(STORAGE_KEY);
          }
        } catch (e) {
          console.error('Error parsing or validating stored API key:', e);
          localStorage.removeItem(STORAGE_KEY);
        }
      }

      // Generate fingerprint and register
      const fingerprint = generateDeviceFingerprint();
      try {
        const data = await spoilerShieldService.registerDevice(fingerprint);
        const apiKeyObj = {
          key: data.apiKey,
          fingerprint,
          createdAt: Date.now(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(apiKeyObj));
        setApiKey(data.apiKey);
      } catch (err: any) {
        console.error('Error during device registration:', err);
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    getOrCreateApiKey();
  }, []);

  return (
    <ApiKeyContext.Provider value={{ apiKey, loading, error }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export function useApiKey() {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
} 