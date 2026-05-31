import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage
 * All Page Object classes extend this. Provides shared helpers so
 * every POM gets navigation, waiting, and assertion utilities for free.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ── Navigation ─────────────────────────────────────────────────────────────

  async navigate(path: string = '/') {
    await this.page.goto(path);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ── Element Helpers ────────────────────────────────────────────────────────

  async clickElement(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async fillInput(locator: Locator, value: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(value);
  }

  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return (await locator.textContent()) ?? '';
  }

  // ── Assertion Helpers ──────────────────────────────────────────────────────

  async assertVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async assertText(locator: Locator, text: string) {
    await expect(locator).toHaveText(text);
  }

  async assertURL(urlPattern: string | RegExp) {
    await expect(this.page).toHaveURL(urlPattern);
  }

  async assertTitle(title: string | RegExp) {
    await expect(this.page).toHaveTitle(title);
  }

  // ── Wait Helpers ───────────────────────────────────────────────────────────

  async waitForSelector(selector: string, timeout = 10_000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  async waitForResponse(urlPattern: string | RegExp) {
    return this.page.waitForResponse(urlPattern);
  }
}
