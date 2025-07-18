import { ApiKey, DeviceFingerprint } from '../../types/api';

// Extension version - should match package.json
const EXTENSION_VERSION = '1.0.0';

/**
 * Generates a cryptographically secure random API key
 */
export function generateApiKey(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Generates a device fingerprint for identification
 */
export function generateDeviceFingerprint(): DeviceFingerprint {
  return {
    userAgent: navigator.userAgent,
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    platform: navigator.platform,
    extensionVersion: EXTENSION_VERSION
  };
}

/**
 * Generates a device ID from fingerprint
 */
export async function generateDeviceId(fingerprint: DeviceFingerprint): Promise<string> {
  const fingerprintString = JSON.stringify(fingerprint);
  const encoder = new TextEncoder();
  const data = encoder.encode(fingerprintString);
  
  const hash = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hash));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 16);
}

/**
 * Creates a new API key for the device
 */
export async function createApiKey(): Promise<ApiKey> {
  const fingerprint = generateDeviceFingerprint();
  const deviceId = await generateDeviceId(fingerprint);
  const key = generateApiKey();
  const now = Date.now();

  return {
    key,
    deviceId,
    createdAt: now,
    lastUsed: now,
    version: EXTENSION_VERSION
  };
}

/**
 * Signs a request with the API key for additional security
 */
export async function signRequest(url: string, method: string, timestamp: number, apiKey: string): Promise<string> {
  const message = `${method.toUpperCase()}:${url}:${timestamp}:${apiKey}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  
  const hash = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hash));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Manages API key storage and retrieval
 */
export class ApiKeyManager {
  private static readonly STORAGE_KEY = 'spoilerShieldApiKey';
  private static readonly KEY_ROTATION_DAYS = 90; // Rotate keys every 90 days

  /**
   * Gets the current API key, creating one if it doesn't exist
   */
  static async getApiKey(): Promise<ApiKey> {
    try {
      const stored = await this.getStoredApiKey();
      
      if (stored && this.isKeyValid(stored)) {
        // Update last used timestamp
        stored.lastUsed = Date.now();
        await this.storeApiKey(stored);
        return stored;
      }
      
      // Create new key if none exists or current one is expired
      const newKey = await createApiKey();
      await this.storeApiKey(newKey);
      return newKey;
    } catch (error) {
      console.error('Error getting API key:', error);
      throw new Error('Failed to get API key');
    }
  }

  /**
   * Checks if the API key is still valid (not expired)
   */
  private static isKeyValid(apiKey: ApiKey): boolean {
    const now = Date.now();
    const keyAge = now - apiKey.createdAt;
    const maxAge = this.KEY_ROTATION_DAYS * 24 * 60 * 60 * 1000; // 90 days in milliseconds
    
    return keyAge < maxAge;
  }

  /**
   * Stores the API key in browser storage
   */
  private static async storeApiKey(apiKey: ApiKey): Promise<void> {
    // Use localStorage for now - can be enhanced with chrome.storage when needed
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(apiKey));
  }

  /**
   * Retrieves the stored API key
   */
  private static async getStoredApiKey(): Promise<ApiKey | null> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error retrieving stored API key:', error);
      return null;
    }
  }

  /**
   * Clears the stored API key (useful for testing or reset)
   */
  static async clearApiKey(): Promise<void> {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing API key:', error);
    }
  }

  /**
   * Forces rotation of the API key
   */
  static async rotateApiKey(): Promise<ApiKey> {
    await this.clearApiKey();
    return await this.getApiKey();
  }
} 