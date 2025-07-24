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
  async getSchedule(request: ScheduleRequest & { timezone: string; competitionIds: string[]; apiKey: string }): Promise<ScheduleResponse> {
    // GET to /schedule/:date?timezone=...&competitionIds=...
    // Pass apiKey and apiVersion as required by the get method signature
    const response = await spoilerShieldApiClient.get<ScheduleResponse>(
      `/schedule/${request.date}`,
      {
        params: {
          timezone: request.timezone,
          competitionIds: request.competitionIds.join(',') // Always send as comma-separated string
        }
      },
      request.apiKey,
      '1.0.0'
    );

    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch schedule');
    }

    return response.data!;
  }

  /**
   * Retrieve competitions for all sports
   */
  async getCompetitions(apiKey: string): Promise<CompetitionsResponse> {
    const response = await spoilerShieldApiClient.get<CompetitionsResponse>(
      '/competitions',
      {},
      apiKey,
      '1.0.0',
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
  async getSpoilers(request: SpoilerRequest & { apiKey: string }): Promise<SpoilersResponse> {
    const response = await spoilerShieldApiClient.get<SpoilersResponse>(
      `/spoilers/${request.eventId}`,
      {},
      request.apiKey,
      '1.0.0',
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
  async reportIssue(request: ReportIssueRequest & { apiKey: string }): Promise<ReportIssueResponse> {
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
        formData,
        {},
        request.apiKey,
        '1.0.0'
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
        },
        {},
        request.apiKey,
        '1.0.0'
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
   * Register a device and get an API key
   */
  async registerDevice(fingerprint: any): Promise<{ apiKey: string }> {
    const response = await spoilerShieldApiClient.post<{ apiKey: string }>(
      '/auth/register-device',
      { fingerprint },
      {},
      '', // No API key required for registration
      '1.0.0'
    );
    if (!response.success) {
      throw new Error(response.error || 'Failed to register device');
    }
    return response.data!;
  }

  /**
   * Validate an API key with fingerprint
   */
  async validateApiKey(apiKey: string, fingerprint: any): Promise<{ valid: boolean }> {
    const params = {
      apiKey,
      fingerprint: JSON.stringify(fingerprint)
    };
    // Use GET with params
    const response = await spoilerShieldApiClient.get<{ valid: boolean }>(
      '/auth/validate',
      { params },
      '', // No API key required for validation
      '1.0.0',
      false
    );
    if (!response.success) {
      throw new Error(response.error || 'Failed to validate API key');
    }
    return response.data!;
  }
}

// Export singleton instance
export const spoilerShieldService = new SpoilerShieldService(); 