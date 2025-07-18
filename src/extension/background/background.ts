import { spoilerShieldService } from '../../shared/utils/api/spoilerShieldService';
import { ApiKeyManager } from '../../shared/utils/api/deviceAuth';

// Message types for communication between popup/content scripts and background
interface ApiMessage {
  type: string;
  data?: any;
  id?: string;
}

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  id?: string;
}

// Handle messages from popup/content scripts
chrome.runtime.onMessage.addListener((request: ApiMessage, sender, sendResponse) => {
  console.log('Background received message:', request);
  
  switch (request.type) {
    case 'FETCH_SCHEDULE':
      handleFetchSchedule(request.data, sendResponse);
      return true; // Keep message channel open for async response
      
    case 'FETCH_COMPETITIONS':
      handleFetchCompetitions(sendResponse);
      return true;
      
    case 'FETCH_SPOILERS':
      handleFetchSpoilers(request.data, sendResponse);
      return true;
      
    case 'REPORT_ISSUE':
      handleReportIssue(request.data, sendResponse);
      return true;
      
    case 'GET_API_KEY':
      handleGetApiKey(sendResponse);
      return true;
      
    case 'ROTATE_API_KEY':
      handleRotateApiKey(sendResponse);
      return true;
      
    case 'CLEAR_CACHE':
      handleClearCache(sendResponse);
      return true;
      
    default:
      sendResponse({ success: false, error: 'Unknown message type' });
      return false;
  }
});

async function handleFetchSchedule(data: { sports: string[]; date: string }, sendResponse: (response: ApiResponse) => void) {
  try {
    const schedule = await spoilerShieldService.getSchedule(data);
    sendResponse({ success: true, data: schedule });
  } catch (error: any) {
    sendResponse({ success: false, error: error.message });
  }
}

async function handleFetchCompetitions(sendResponse: (response: ApiResponse) => void) {
  try {
    const competitions = await spoilerShieldService.getCompetitions();
    sendResponse({ success: true, data: competitions });
  } catch (error: any) {
    sendResponse({ success: false, error: error.message });
  }
}

async function handleFetchSpoilers(data: { eventId: string }, sendResponse: (response: ApiResponse) => void) {
  try {
    const spoilers = await spoilerShieldService.getSpoilers(data);
    sendResponse({ success: true, data: spoilers });
  } catch (error: any) {
    sendResponse({ success: false, error: error.message });
  }
}

async function handleReportIssue(data: any, sendResponse: (response: ApiResponse) => void) {
  try {
    const result = await spoilerShieldService.reportIssue(data);
    sendResponse({ success: true, data: result });
  } catch (error: any) {
    sendResponse({ success: false, error: error.message });
  }
}

async function handleGetApiKey(sendResponse: (response: ApiResponse) => void) {
  try {
    const apiKey = await ApiKeyManager.getApiKey();
    sendResponse({ success: true, data: apiKey });
  } catch (error: any) {
    sendResponse({ success: false, error: error.message });
  }
}

async function handleRotateApiKey(sendResponse: (response: ApiResponse) => void) {
  try {
    const newApiKey = await ApiKeyManager.rotateApiKey();
    sendResponse({ success: true, data: newApiKey });
  } catch (error: any) {
    sendResponse({ success: false, error: error.message });
  }
}

async function handleClearCache(sendResponse: (response: ApiResponse) => void) {
  try {
    spoilerShieldService.clearCache();
    sendResponse({ success: true });
  } catch (error: any) {
    sendResponse({ success: false, error: error.message });
  }
}

// Initialize API key on extension startup
chrome.runtime.onStartup.addListener(async () => {
  try {
    await ApiKeyManager.getApiKey();
    console.log('API key initialized on startup');
  } catch (error) {
    console.error('Failed to initialize API key on startup:', error);
  }
});

// Initialize API key on extension install
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    try {
      await ApiKeyManager.getApiKey();
      console.log('API key initialized on install');
    } catch (error) {
      console.error('Failed to initialize API key on install:', error);
    }
  }
});

// Periodic cache cleanup
setInterval(() => {
  spoilerShieldService.clearCache();
  console.log('Cache cleared by background script');
}, 30 * 60 * 1000); // Clear cache every 30 minutes

// Handle extension uninstall to clean up data
chrome.runtime.setUninstallURL('https://spoilershield.com/uninstall', () => {
  console.log('Uninstall URL set');
});

console.log('SpoilerShield background script loaded'); 