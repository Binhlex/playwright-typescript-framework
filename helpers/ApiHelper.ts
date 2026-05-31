import { APIRequestContext, APIResponse, expect } from '@playwright/test';

/**
 * ApiHelper
 * Wraps Playwright's APIRequestContext with typed, reusable methods.
 * Used by all API test specs.
 */
export class ApiHelper {
  constructor(private request: APIRequestContext) {}

  // ── Core Methods ───────────────────────────────────────────────────────────

  async get(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.get(endpoint, { headers });
  }

  async post(endpoint: string, body: unknown, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.post(endpoint, {
      data: body,
      headers: { 'Content-Type': 'application/json', ...headers },
    });
  }

  async put(endpoint: string, body: unknown, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.put(endpoint, {
      data: body,
      headers: { 'Content-Type': 'application/json', ...headers },
    });
  }

  async patch(endpoint: string, body: unknown, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.patch(endpoint, {
      data: body,
      headers: { 'Content-Type': 'application/json', ...headers },
    });
  }

  async delete(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.delete(endpoint, { headers });
  }

  // ── Assertion Helpers ──────────────────────────────────────────────────────

  async assertStatus(response: APIResponse, statusCode: number) {
    expect(response.status()).toBe(statusCode);
  }

  async assertOk(response: APIResponse) {
    expect(response.ok()).toBeTruthy();
  }

  async getJson<T = unknown>(response: APIResponse): Promise<T> {
    return response.json() as Promise<T>;
  }

  async assertResponseTime(response: APIResponse, maxMs: number) {
    // Playwright tracks timing via the response headers; log as a soft check
    const timing = response.headers()['x-response-time'];
    if (timing) {
      const ms = parseInt(timing, 10);
      expect.soft(ms, `Response time ${ms}ms exceeded limit of ${maxMs}ms`).toBeLessThanOrEqual(maxMs);
    }
  }
}
