import { spoilerShieldApiClient } from './apiClient';
import {
  ScheduleRequest,
  ScheduleResponse,
  CompetitionsResponse,
  SpoilerRequest,
  SpoilersResponse,
  ReportIssueRequest,
  ReportIssueResponse
} from '../../types/api';

export class SpoilerShieldService {
  /**
   * Retrieve schedule for specified sports and date
   */
  async getSchedule(request: ScheduleRequest): Promise<ScheduleResponse> {
    const response = await spoilerShieldApiClient.get<ScheduleResponse>(
      '/schedule',
      {
        params: {
          sports: request.sports.join(','),
          date: request.date
        }
      },
      true // Use cache for schedule data
    );

    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch schedule');
    }

    return response.data!;
  }

  /**
   * Retrieve competitions for all sports
   */
  async getCompetitions(): Promise<CompetitionsResponse> {
    const response = await spoilerShieldApiClient.get<CompetitionsResponse>(
      '/competitions',
      undefined,
      true // Cache competitions as they don't change frequently
    );

    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch competitions');
    }

    return response.data!;
  }

  /**
   * Retrieve spoilers for a specific event
   */
  async getSpoilers(request: SpoilerRequest): Promise<SpoilersResponse> {
    const response = await spoilerShieldApiClient.get<SpoilersResponse>(
      `/spoilers/${request.eventId}`,
      undefined,
      false // Don't cache spoilers as they change frequently
    );

    if (!response.success) {
      if (response.status === 404) {
        // Return empty spoilers if event not found
        return {
          eventId: request.eventId,
          spoilers: [],
          totalCount: 0
        };
      }
      throw new Error(response.error || 'Failed to fetch spoilers');
    }

    return response.data!;
  }

  /**
   * Report an issue with optional file attachment
   */
  async reportIssue(request: ReportIssueRequest): Promise<ReportIssueResponse> {
    if (!request.description || request.description.trim() === '') {
      throw new Error('Description is required');
    }

    // If file is provided, use FormData
    if (request.file) {
      const formData = new FormData();
      formData.append('description', request.description);
      
      if (request.device) formData.append('device', request.device);
      if (request.browser) formData.append('browser', request.browser);
      if (request.website) formData.append('website', request.website);
      formData.append('file', request.file);

      const response = await spoilerShieldApiClient.postFormData<ReportIssueResponse>(
        '/report-issue',
        formData
      );

      if (!response.success) {
        throw new Error(response.error || 'Failed to submit issue report');
      }

      return response.data!;
    } else {
      // No file, use regular JSON POST
      const response = await spoilerShieldApiClient.post<ReportIssueResponse>(
        '/report-issue',
        {
          description: request.description,
          device: request.device,
          browser: request.browser,
          website: request.website
        }
      );

      if (!response.success) {
        throw new Error(response.error || 'Failed to submit issue report');
      }

      return response.data!;
    }
  }

  /**
   * Clear API cache (useful for testing or manual refresh)
   */
  clearCache(): void {
    spoilerShieldApiClient.clearCache();
  }

  /**
   * Get rate limit status for an endpoint
   */
  getRateLimitStatus(endpoint: string): { count: number; limit: number; resetTime: number } | null {
    return spoilerShieldApiClient.getRateLimitStatus(endpoint);
  }

  /**
   * Check if rate limit is exceeded for an endpoint
   */
  isRateLimitExceeded(endpoint: string): boolean {
    const status = this.getRateLimitStatus(endpoint);
    if (!status) return false;
    
    const now = Date.now();
    if (now > status.resetTime) return false;
    
    return status.count >= status.limit;
  }

  /**
   * Get time until rate limit resets (in seconds)
   */
  getTimeUntilReset(endpoint: string): number {
    const status = this.getRateLimitStatus(endpoint);
    if (!status) return 0;
    
    const now = Date.now();
    const timeUntilReset = Math.max(0, status.resetTime - now);
    
    return Math.ceil(timeUntilReset / 1000); // Convert to seconds
  }
}

// Export singleton instance
export const spoilerShieldService = new SpoilerShieldService(); 