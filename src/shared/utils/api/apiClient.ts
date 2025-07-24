import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse, RateLimitInfo, ApiError, RateLimitError } from '../../types/api';
import { ApiKeyManager, signRequest, getApiKeyFromBackground, isBackgroundContext } from './deviceAuth';
import { config } from '../../config/environment';

// API configuration
interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

class ApiClient {
  private client: AxiosInstance;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

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
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('SpoilerShield API Error:', error.response?.data || error.message);
        // Handle rate limit errors gracefully
        if (error.response?.status === 429) {
          const retryAfter = error.response?.headers['retry-after'];
          // Optionally, you can add logic here to notify the user or handle retry
          console.warn('Rate limit exceeded. Retry after:', retryAfter);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Adds authentication headers to the request
   */
  private async addAuthHeaders(config: AxiosRequestConfig, apiKey: string, apiVersion: string = '1.0.0'): Promise<void> {
    try {
      const timestamp = Date.now();
      // Retrieve API key and fingerprint from storage or context
      let fingerprintHeader = undefined;
      const stored = localStorage.getItem('spoilerShieldApiKey');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.fingerprint) {
            fingerprintHeader = JSON.stringify(parsed.fingerprint);
          }
        } catch {}
      }
      config.headers = {
        ...config.headers,
        'X-API-Key': apiKey,
        'X-Timestamp': timestamp.toString(),
        'X-Extension-Version': apiVersion,
        ...(fingerprintHeader ? { 'X-Fingerprint': fingerprintHeader } : {})
      };
    } catch (error) {
      console.error('Error adding auth headers:', error);
      throw new Error('Authentication failed');
    }
  }

  private getCacheKey(url: string, params?: any): string {
    return `${url}${params ? JSON.stringify(params) : ''}`;
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_DURATION;
  }

  /**
   * Makes a GET request with authentication
   */
  async get<T>(url: string, config: AxiosRequestConfig = {}, apiKey: string, apiVersion: string = '1.0.0', useCache = true): Promise<ApiResponse<T>> {
    const cacheKey = this.getCacheKey(url, config?.params);
    if (useCache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      if (this.isCacheValid(cached.timestamp)) {
        return { success: true, data: cached.data };
      }
    }
    try {
      await this.addAuthHeaders(config, apiKey, apiVersion);
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
   * Makes a POST request with authentication
   */
  async post<T>(url: string, data: any = {}, config: AxiosRequestConfig = {}, apiKey: string, apiVersion: string = '1.0.0'): Promise<ApiResponse<T>> {
    try {
      await this.addAuthHeaders(config, apiKey, apiVersion);
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
  async postFormData<T>(url: string, formData: FormData, config: AxiosRequestConfig = {}, apiKey: string, apiVersion: string = '1.0.0'): Promise<ApiResponse<T>> {
    try {
      await this.addAuthHeaders(config, apiKey, apiVersion);
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
}

// Create SpoilerShield API client
export const spoilerShieldApiClient = new ApiClient({
  baseURL: config.api.baseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
}); 