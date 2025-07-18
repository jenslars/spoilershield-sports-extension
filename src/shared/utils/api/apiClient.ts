import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse, RateLimitInfo, ApiError, RateLimitError } from '../../types/api';
import { ApiKeyManager, signRequest } from './deviceAuth';

// API configuration
interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

// Rate limiting configuration
interface RateLimitConfig {
  schedule: { limit: number; window: number }; // requests per window (seconds)
  spoilers: { limit: number; window: number };
  competitions: { limit: number; window: number };
  reportIssue: { limit: number; window: number };
}

class ApiClient {
  private client: AxiosInstance;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private rateLimitCache: Map<string, { count: number; resetTime: number }> = new Map();

  // Rate limiting configuration
  private readonly rateLimits: RateLimitConfig = {
    schedule: { limit: 100, window: 3600 }, // 100 requests per hour
    spoilers: { limit: 500, window: 3600 }, // 500 requests per hour
    competitions: { limit: 50, window: 3600 }, // 50 requests per hour
    reportIssue: { limit: 10, window: 86400 } // 10 requests per day
  };

  constructor(config: ApiConfig) {
    this.client = axios.create(config);
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor for authentication and logging
    this.client.interceptors.request.use(
      async (config) => {
        console.log(`SpoilerShield API Request: ${config.method?.toUpperCase()} ${config.url}`);
        
        // Add authentication headers
        await this.addAuthHeaders(config);
        
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling and rate limit tracking
    this.client.interceptors.response.use(
      (response) => {
        // Track rate limit info from response headers
        this.updateRateLimitInfo(response);
        return response;
      },
      (error) => {
        console.error('SpoilerShield API Error:', error.response?.data || error.message);
        
        // Handle rate limit errors
        if (error.response?.status === 429) {
          this.handleRateLimitError(error);
        }
        
        return Promise.reject(error);
      }
    );
  }

  /**
   * Adds authentication headers to the request
   */
  private async addAuthHeaders(config: AxiosRequestConfig): Promise<void> {
    try {
      const apiKey = await ApiKeyManager.getApiKey();
      const timestamp = Date.now();
      const signature = await signRequest(config.url || '', config.method || 'GET', timestamp, apiKey.key);

      config.headers = {
        ...config.headers,
        'X-API-Key': apiKey.key,
        'X-Device-ID': apiKey.deviceId,
        'X-Timestamp': timestamp.toString(),
        'X-Signature': signature,
        'X-Extension-Version': apiKey.version
      };
    } catch (error) {
      console.error('Error adding auth headers:', error);
      throw new Error('Authentication failed');
    }
  }

  /**
   * Updates rate limit information from response headers
   */
  private updateRateLimitInfo(response: AxiosResponse): void {
    const rateLimitHeaders = {
      'X-RateLimit-Limit': response.headers['x-ratelimit-limit'],
      'X-RateLimit-Remaining': response.headers['x-ratelimit-remaining'],
      'X-RateLimit-Reset': response.headers['x-ratelimit-reset']
    };

    if (rateLimitHeaders['X-RateLimit-Limit']) {
      const endpoint = this.getEndpointFromUrl(response.config.url || '');
      const rateLimitInfo: RateLimitInfo = {
        limit: parseInt(rateLimitHeaders['X-RateLimit-Limit']),
        remaining: parseInt(rateLimitHeaders['X-RateLimit-Remaining']),
        reset: parseInt(rateLimitHeaders['X-RateLimit-Reset'])
      };

      // Store rate limit info for this endpoint
      this.rateLimitCache.set(endpoint, {
        count: rateLimitInfo.limit - rateLimitInfo.remaining,
        resetTime: rateLimitInfo.reset * 1000 // Convert to milliseconds
      });
    }
  }

  /**
   * Handles rate limit errors
   */
  private handleRateLimitError(error: any): void {
    const retryAfter = error.response?.headers['retry-after'];
    const rateLimitError: RateLimitError = {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Rate limit exceeded',
      retryAfter: retryAfter ? parseInt(retryAfter) : 60
    };
    
    console.warn('Rate limit exceeded:', rateLimitError);
  }

  /**
   * Gets endpoint type from URL for rate limiting
   */
  private getEndpointFromUrl(url: string): string {
    if (url.includes('/schedule')) return 'schedule';
    if (url.includes('/spoilers')) return 'spoilers';
    if (url.includes('/competitions')) return 'competitions';
    if (url.includes('/report-issue')) return 'reportIssue';
    return 'default';
  }

  /**
   * Checks if rate limit would be exceeded for the endpoint
   */
  private checkRateLimit(endpoint: string): boolean {
    const config = this.rateLimits[endpoint as keyof RateLimitConfig];
    if (!config) return false;

    const cacheKey = endpoint;
    const cached = this.rateLimitCache.get(cacheKey);
    
    if (!cached) return false;

    const now = Date.now();
    
    // Check if window has reset
    if (now > cached.resetTime) {
      this.rateLimitCache.delete(cacheKey);
      return false;
    }

    // Check if limit would be exceeded
    return cached.count >= config.limit;
  }

  private getCacheKey(url: string, params?: any): string {
    return `${url}${params ? JSON.stringify(params) : ''}`;
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_DURATION;
  }

  /**
   * Makes a GET request with authentication and rate limiting
   */
  async get<T>(url: string, config?: AxiosRequestConfig, useCache = true): Promise<ApiResponse<T>> {
    const endpoint = this.getEndpointFromUrl(url);
    
    // Check rate limit
    if (this.checkRateLimit(endpoint)) {
      return {
        success: false,
        error: 'Rate limit exceeded',
        status: 429
      };
    }

    const cacheKey = this.getCacheKey(url, config?.params);
    
    if (useCache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      if (this.isCacheValid(cached.timestamp)) {
        return { success: true, data: cached.data };
      }
    }

    try {
      const response: AxiosResponse<T> = await this.client.get(url, config);
      
      if (useCache) {
        this.cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
      }
      
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
        status: error.response?.status
      };
    }
  }

  /**
   * Makes a POST request with authentication and rate limiting
   */
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const endpoint = this.getEndpointFromUrl(url);
    
    // Check rate limit
    if (this.checkRateLimit(endpoint)) {
      return {
        success: false,
        error: 'Rate limit exceeded',
        status: 429
      };
    }

    try {
      const response: AxiosResponse<T> = await this.client.post(url, data, config);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
        status: error.response?.status
      };
    }
  }

  /**
   * Makes a POST request with FormData for file uploads
   */
  async postFormData<T>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const endpoint = this.getEndpointFromUrl(url);
    
    // Check rate limit
    if (this.checkRateLimit(endpoint)) {
      return {
        success: false,
        error: 'Rate limit exceeded',
        status: 429
      };
    }

    try {
      const response: AxiosResponse<T> = await this.client.post(url, formData, {
        ...config,
        headers: {
          ...config?.headers,
          'Content-Type': 'multipart/form-data'
        }
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
        status: error.response?.status
      };
    }
  }

  /**
   * Clears the cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Gets current rate limit status for an endpoint
   */
  getRateLimitStatus(endpoint: string): { count: number; limit: number; resetTime: number } | null {
    const cached = this.rateLimitCache.get(endpoint);
    if (!cached) return null;

    const config = this.rateLimits[endpoint as keyof RateLimitConfig];
    if (!config) return null;

    return {
      count: cached.count,
      limit: config.limit,
      resetTime: cached.resetTime
    };
  }
}

// Create SpoilerShield API client
export const spoilerShieldApiClient = new ApiClient({
  baseURL: process.env.REACT_APP_SPOILERSHIELD_API_URL || 'https://api.spoilershield.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
}); 