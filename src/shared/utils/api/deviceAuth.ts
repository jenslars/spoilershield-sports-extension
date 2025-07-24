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
 * Creates a new API key for the device
 */
export async function createApiKey(): Promise<ApiKey> {
  const fingerprint = generateDeviceFingerprint();
  const key = generateApiKey();
  const now = Date.now();

  return {
    key,
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

const API_BASE = '/auth';

async function registerDeviceWithServer(fingerprint: string): Promise<{ apiKey: string }> {
  const res = await fetch(`${API_BASE}/register-device`, {
    method: 'POST',
    body: JSON.stringify({ fingerprint }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to register device');
  return res.json();
}

async function rotateKeyWithServer(apiKey: string, fingerprint: string): Promise<{ apiKey: string }> {
  const res = await fetch(`${API_BASE}/rotate-key`, {
    method: 'POST',
    body: JSON.stringify({ apiKey, fingerprint }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to rotate key');
  return res.json();
}

async function validateKeyWithServer(apiKey: string, fingerprint: string): Promise<{ valid: boolean }> {
  const params = new URLSearchParams({ apiKey, fingerprint });
  const res = await fetch(`${API_BASE}/validate?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to validate key');
  return res.json();
}

/**
 * Helper functions for storage abstraction (chrome.storage.local or localStorage)
 */
function isChromeStorageAvailable() {
  return typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local;
}

function setStorageItem(key: string, value: any): Promise<void> {
  if (isChromeStorageAvailable()) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ [key]: value }, function () {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  } else {
    localStorage.setItem(key, JSON.stringify(value));
    return Promise.resolve();
  }
}

function getStorageItem<T>(key: string): Promise<T | null> {
  if (isChromeStorageAvailable()) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([key], function (result) {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result[key] ?? null);
        }
      });
    });
  } else {
    const stored = localStorage.getItem(key);
    return Promise.resolve(stored ? JSON.parse(stored) : null);
  }
}

function removeStorageItem(key: string): Promise<void> {
  if (isChromeStorageAvailable()) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove([key], function () {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  } else {
    localStorage.removeItem(key);
    return Promise.resolve();
  }
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
      const fingerprint = generateDeviceFingerprint();
      
      if (stored && this.isKeyValid(stored)) {
        // Validate with server
        const valid = await validateKeyWithServer(stored.key, JSON.stringify(fingerprint));
        if (valid.valid) {
          // Update last used timestamp
          stored.lastUsed = Date.now();
          await this.storeApiKey(stored);
          return stored;
        } else {
          // Key invalid, rotate
          return await this.rotateApiKey();
        }
      }
      
      // Register new device
      const reg = await registerDeviceWithServer(JSON.stringify(fingerprint));
      const now = Date.now();
      const apiKey: ApiKey = {
        key: reg.apiKey,
        createdAt: now,
        lastUsed: now,
        version: EXTENSION_VERSION
      };
      await this.storeApiKey(apiKey);
      return apiKey;
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
    await setStorageItem(this.STORAGE_KEY, apiKey);
  }

  /**
   * Retrieves the stored API key
   */
  private static async getStoredApiKey(): Promise<ApiKey | null> {
    try {
      return await getStorageItem<ApiKey>(this.STORAGE_KEY);
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
      await removeStorageItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing API key:', error);
    }
  }

  /**
   * Forces rotation of the API key
   */
  static async rotateApiKey(): Promise<ApiKey> {
    const stored = await this.getStoredApiKey();
    const fingerprint = generateDeviceFingerprint();
    if (stored) {
      const rotated = await rotateKeyWithServer(stored.key, JSON.stringify(fingerprint));
      const now = Date.now();
      const apiKey: ApiKey = {
        key: rotated.apiKey,
        createdAt: now,
        lastUsed: now,
        version: EXTENSION_VERSION
      };
      await this.storeApiKey(apiKey);
      return apiKey;
    } else {
      // No key to rotate, register new
      return await this.getApiKey();
    }
  }
} 

/**
 * Returns true if running in the background script context
 */
export function isBackgroundContext(): boolean {
  if (typeof chrome === 'undefined' || !chrome.runtime) return false;
  // Manifest V2: getBackgroundPage is a function
  if (typeof chrome.runtime.getBackgroundPage === 'function') return true;
  // Manifest V3: background property exists in manifest
  try {
    const manifest = chrome.runtime.getManifest && chrome.runtime.getManifest();
    if (manifest && manifest.background) return true;
  } catch (e) {}
  return false;
}

/**
 * For popup/content scripts: get API key from background script via messaging
 */
export async function getApiKeyFromBackground(): Promise<ApiKey> {
  return new Promise((resolve, reject) => {
    if (!chrome.runtime || !chrome.runtime.sendMessage) {
      reject(new Error('chrome.runtime.sendMessage not available'));
      return;
    }
    chrome.runtime.sendMessage({ type: 'GET_API_KEY' }, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else if (response && response.success) {
        resolve(response.data);
      } else {
        reject(new Error(response?.error || 'Failed to get API key from background'));
      }
    });
  });
} 