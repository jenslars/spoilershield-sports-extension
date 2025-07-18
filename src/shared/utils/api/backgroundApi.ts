// Types for background script communication
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

/**
 * Utility class for communicating with the background script
 */
export class BackgroundApi {
  /**
   * Sends a message to the background script and returns a promise
   */
  static async sendMessage(message: ApiMessage): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
      try {
        // Check if we're in a browser extension context
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
          chrome.runtime.sendMessage(message, (response: ApiResponse) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              resolve(response);
            }
          });
        } else {
          // Fallback for non-extension environments (testing)
          console.warn('Chrome API not available, using mock response');
          resolve({ success: false, error: 'Chrome API not available' });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Fetch schedule from the API
   */
  static async fetchSchedule(sports: string[], date: string): Promise<any> {
    const response = await this.sendMessage({
      type: 'FETCH_SCHEDULE',
      data: { sports, date }
    });

    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch schedule');
    }

    return response.data;
  }

  /**
   * Fetch competitions from the API
   */
  static async fetchCompetitions(): Promise<any> {
    const response = await this.sendMessage({
      type: 'FETCH_COMPETITIONS'
    });

    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch competitions');
    }

    return response.data;
  }

  /**
   * Fetch spoilers for an event
   */
  static async fetchSpoilers(eventId: string): Promise<any> {
    const response = await this.sendMessage({
      type: 'FETCH_SPOILERS',
      data: { eventId }
    });

    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch spoilers');
    }

    return response.data;
  }

  /**
   * Report an issue
   */
  static async reportIssue(issueData: any): Promise<any> {
    const response = await this.sendMessage({
      type: 'REPORT_ISSUE',
      data: issueData
    });

    if (!response.success) {
      throw new Error(response.error || 'Failed to report issue');
    }

    return response.data;
  }

  /**
   * Get the current API key
   */
  static async getApiKey(): Promise<any> {
    const response = await this.sendMessage({
      type: 'GET_API_KEY'
    });

    if (!response.success) {
      throw new Error(response.error || 'Failed to get API key');
    }

    return response.data;
  }

  /**
   * Rotate the API key
   */
  static async rotateApiKey(): Promise<any> {
    const response = await this.sendMessage({
      type: 'ROTATE_API_KEY'
    });

    if (!response.success) {
      throw new Error(response.error || 'Failed to rotate API key');
    }

    return response.data;
  }

  /**
   * Clear the API cache
   */
  static async clearCache(): Promise<void> {
    const response = await this.sendMessage({
      type: 'CLEAR_CACHE'
    });

    if (!response.success) {
      throw new Error(response.error || 'Failed to clear cache');
    }
  }
} 