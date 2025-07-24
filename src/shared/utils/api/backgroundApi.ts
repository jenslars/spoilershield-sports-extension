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
 *
 * Only keep methods for background-only features (e.g., clearCache, getApiKey, rotateApiKey) if still used.
 * Remove all API proxy methods (fetchSchedule, fetchCompetitions, fetchSpoilers, reportIssue).
 */
export class BackgroundApi {
  /**
   * Sends a message to the background script and returns a promise
   */
  static async sendMessage(message: ApiMessage): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
      try {
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
          chrome.runtime.sendMessage(message, (response: ApiResponse) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              resolve(response);
            }
          });
        } else {
          console.warn('Chrome API not available, using mock response');
          resolve({ success: false, error: 'Chrome API not available' });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get the current API key (if still needed via background)
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
   * Rotate the API key (if still needed via background)
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
   * Clear the API cache (if still needed via background)
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