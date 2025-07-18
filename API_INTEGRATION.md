# SpoilerShield API Integration

This document describes the complete API integration system for the SpoilerShield browser extension.

## Overview

The API integration system provides:
- **Device-based authentication** with API keys
- **Rate limiting** and abuse prevention
- **Caching** for improved performance
- **Error handling** and retry logic
- **Background script communication** for extension context

## Architecture

```
src/shared/utils/api/
├── apiClient.ts          # Main API client with auth and rate limiting
├── deviceAuth.ts         # Device authentication and key management
├── spoilerShieldService.ts # Service layer for API endpoints
├── backgroundApi.ts      # Background script communication utility
└── config/
    └── environment.ts    # Configuration and environment settings
```

## Core Components

### 1. API Client (`apiClient.ts`)

The main API client handles all HTTP requests with:
- Automatic authentication headers
- Rate limiting per endpoint
- Request/response caching
- Error handling and logging

**Key Features:**
- Device-based API key authentication
- Request signing for security
- Sliding window rate limiting
- Automatic cache management

### 2. Device Authentication (`deviceAuth.ts`)

Manages device-based API keys:
- Generates cryptographically secure keys
- Creates device fingerprints
- Handles key storage and rotation
- Signs requests for additional security

**Key Features:**
- Automatic key generation on first use
- 90-day key rotation
- Device fingerprinting for identification
- Secure storage in browser storage

### 3. SpoilerShield Service (`spoilerShieldService.ts`)

Service layer for all API endpoints:
- Schedule retrieval
- Competitions data
- Spoiler detection
- Issue reporting

**Available Methods:**
- `getSchedule(request)` - Fetch schedule for sports and date
- `getCompetitions()` - Get all sports and competitions
- `getSpoilers(request)` - Get spoilers for an event
- `reportIssue(request)` - Report issues with optional file upload

### 4. Background API (`backgroundApi.ts`)

Utility for communicating with the background script:
- Message passing between popup and background
- Error handling for extension context
- Fallback for non-extension environments

## API Endpoints

### 1. Schedule Endpoint
```
GET /schedule?sports=NBA,F1&date=2024-01-15
```

**Request:**
```typescript
{
  sports: string[],
  date: string // ISO date (YYYY-MM-DD)
}
```

**Response:**
```typescript
{
  events: ScheduleEvent[],
  totalCount: number
}
```

### 2. Competitions Endpoint
```
GET /competitions
```

**Response:**
```typescript
{
  sports: SportWithCompetitions[]
}
```

### 3. Spoilers Endpoint
```
GET /spoilers/{eventId}
```

**Request:**
```typescript
{
  eventId: string
}
```

**Response:**
```typescript
{
  eventId: string,
  spoilers: Spoiler[],
  totalCount: number
}
```

### 4. Report Issue Endpoint
```
POST /report-issue
```

**Request:**
```typescript
{
  description: string, // Required
  device?: string,
  browser?: string,
  website?: string,
  file?: File // Optional
}
```

## Rate Limiting

The system implements comprehensive rate limiting:

| Endpoint | Limit | Window |
|----------|-------|--------|
| Schedule | 100 requests | 1 hour |
| Spoilers | 500 requests | 1 hour |
| Competitions | 50 requests | 1 hour |
| Report Issue | 10 requests | 24 hours |

Rate limits are tracked per device and reset automatically.

## Authentication

### Device-Based API Keys

1. **Key Generation**: Cryptographically secure 32-byte keys
2. **Device Fingerprinting**: Browser, screen, timezone, language
3. **Request Signing**: SHA-256 signatures for additional security
4. **Key Rotation**: Automatic rotation every 90 days

### Headers Sent with Each Request

```
X-API-Key: {device_api_key}
X-Device-ID: {device_fingerprint_hash}
X-Timestamp: {current_timestamp}
X-Signature: {request_signature}
X-Extension-Version: {extension_version}
```

## Caching

### Cache Strategy

- **Schedule Data**: 5 minutes (frequently changing)
- **Competitions**: 5 minutes (rarely changing)
- **Spoilers**: No caching (real-time data)
- **API Keys**: Stored securely, no expiration

### Cache Management

- Automatic cleanup every 30 minutes
- Maximum 100 cached items
- LRU eviction policy

## Usage Examples

### 1. Fetching Schedule

```typescript
import { spoilerShieldService } from '../utils/api/spoilerShieldService';

const schedule = await spoilerShieldService.getSchedule({
  sports: ['NBA', 'F1'],
  date: '2024-01-15'
});
```

### 2. Using React Hooks

```typescript
import { useSchedule } from '../hooks/useSchedule';

const { schedule, isLoading, error, refetch } = useSchedule();
```

### 3. Background Script Communication

```typescript
import { BackgroundApi } from '../utils/api/backgroundApi';

const schedule = await BackgroundApi.fetchSchedule(['NBA'], '2024-01-15');
```

### 4. Error Handling

```typescript
try {
  const data = await spoilerShieldService.getSchedule(request);
} catch (error) {
  if (error.message.includes('Rate limit')) {
    // Handle rate limiting
    const retryAfter = spoilerShieldService.getTimeUntilReset('schedule');
  } else {
    // Handle other errors
    console.error('API Error:', error.message);
  }
}
```

## Configuration

### Environment Variables

```bash
REACT_APP_SPOILERSHIELD_API_URL=https://api.spoilershield.com
REACT_APP_MOCK_API=false
REACT_APP_DEBUG=false
```

### Rate Limit Configuration

```typescript
const rateLimits = {
  schedule: { limit: 100, window: 3600 },
  spoilers: { limit: 500, window: 3600 },
  competitions: { limit: 50, window: 3600 },
  reportIssue: { limit: 10, window: 86400 }
};
```

## Security Features

1. **Request Signing**: All requests are signed with device-specific keys
2. **Rate Limiting**: Prevents abuse and ensures fair usage
3. **Device Fingerprinting**: Identifies and tracks devices
4. **Key Rotation**: Regular key updates for security
5. **HTTPS Only**: All API communication uses HTTPS
6. **Input Validation**: All inputs are validated and sanitized

## Error Handling

### Common Error Types

- **Rate Limit Exceeded**: 429 status with retry-after header
- **Authentication Failed**: 401 status
- **Invalid Request**: 400 status
- **Server Error**: 500 status

### Error Response Format

```typescript
{
  success: false,
  error: string,
  status?: number,
  rateLimit?: RateLimitInfo
}
```

## Testing

### Mock API Mode

Enable mock API for testing:

```bash
REACT_APP_MOCK_API=true
```

### Debug Mode

Enable debug logging:

```bash
REACT_APP_DEBUG=true
```

## Monitoring

### Rate Limit Status

```typescript
const status = spoilerShieldService.getRateLimitStatus('schedule');
console.log(`Used: ${status.count}/${status.limit}`);
console.log(`Resets in: ${spoilerShieldService.getTimeUntilReset('schedule')}s`);
```

### Cache Status

```typescript
spoilerShieldService.clearCache(); // Manual cache clear
```

## Best Practices

1. **Always handle errors**: Wrap API calls in try-catch blocks
2. **Check rate limits**: Monitor usage to avoid hitting limits
3. **Use caching**: Leverage built-in caching for better performance
4. **Validate inputs**: Ensure data is properly formatted before sending
5. **Monitor performance**: Watch for slow responses or errors
6. **Update regularly**: Keep the extension updated for security patches

## Troubleshooting

### Common Issues

1. **Authentication Errors**: Check if API key is valid and not expired
2. **Rate Limit Errors**: Wait for reset or implement exponential backoff
3. **Network Errors**: Check internet connection and API endpoint availability
4. **Cache Issues**: Clear cache if data seems stale

### Debug Steps

1. Enable debug mode
2. Check browser console for errors
3. Verify API key generation
4. Test rate limit status
5. Clear cache and retry

## Future Enhancements

1. **Offline Support**: Cache data for offline viewing
2. **Push Notifications**: Real-time spoiler alerts
3. **User Preferences**: Customizable rate limits and caching
4. **Analytics**: Usage tracking and performance monitoring
5. **Multi-device Sync**: Share settings across devices 