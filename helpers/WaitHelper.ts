import { Page } from '@playwright/test';

/**
 * WaitHelper
 * Reusable waiting utilities across all tests.
 */
export class WaitHelper {
  constructor(private page: Page) {}

  async waitForNetworkIdle(timeout = 10_000) {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  async waitForElement(selector: string, timeout = 10_000) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  async waitForElementToDisappear(selector: string, timeout = 10_000) {
    await this.page.waitForSelector(selector, { state: 'hidden', timeout });
  }

  async waitForURL(urlPattern: string | RegExp, timeout = 30_000) {
    await this.page.waitForURL(urlPattern, { timeout });
  }

  /** Poll a condition until it returns true or times out */
  async waitUntil(
    condition: () => Promise<boolean>,
    timeout = 10_000,
    interval = 500
  ): Promise<void> {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      if (await condition()) return;
      await this.page.waitForTimeout(interval);
    }
    throw new Error(`waitUntil timed out after ${timeout}ms`);
  }
}
