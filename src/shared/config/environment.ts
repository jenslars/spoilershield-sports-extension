// Environment configuration for the SpoilerShield extension
export const config = {
  // API configuration
  api: {
    baseUrl: process.env.REACT_APP_SPOILERSHIELD_API_URL || 'https://api.spoilershield.com',
    timeout: 15000, // 15 seconds
    version: '1.0.0'
  },

  // Rate limiting configuration
  rateLimits: {
    schedule: {
      limit: 100, // requests per hour
      window: 3600 // 1 hour in seconds
    },
    spoilers: {
      limit: 30, // requests per hour
      window: 3600 // 1 hour in seconds
    },
    competitions: {
      limit: 10, // requests per hour
      window: 3600 // 1 hour in seconds
    },
    reportIssue: {
      limit: 10, // requests per day
      window: 86400 // 24 hours in seconds
    }
  },

  // Cache configuration
  cache: {
    defaultTtl: 5 * 60 * 1000, // 5 minutes in milliseconds
    maxSize: 100, // Maximum number of cached items
    cleanupInterval: 30 * 60 * 1000 // 30 minutes in milliseconds
  },

  // Authentication configuration
  auth: {
    keyRotationDays: 90, // Rotate API keys every 90 days
    signatureAlgorithm: 'SHA-256'
  },

  // Extension configuration
  extension: {
    name: 'SpoilerShield',
    version: '1.0.0',
    description: 'Block sports spoilers from your browser'
  },

  // Development configuration
  development: {
    enableLogging: process.env.NODE_ENV === 'development',
    mockApi: process.env.REACT_APP_MOCK_API === 'true',
    debugMode: process.env.REACT_APP_DEBUG === 'true'
  }
};

// Helper function to get environment-specific configuration
export function getConfig() {
  const env = process.env.NODE_ENV || 'development';
  
  return {
    ...config,
    isDevelopment: env === 'development',
    isProduction: env === 'production',
    isTest: env === 'test'
  };
}

// Helper function to check if we're in a browser extension context
export function isExtensionContext(): boolean {
  return typeof chrome !== 'undefined' && 
         chrome.runtime && 
         chrome.runtime.id !== undefined;
}

// Helper function to get the extension ID
export function getExtensionId(): string | null {
  if (isExtensionContext()) {
    return chrome.runtime.id;
  }
  return null;
} 