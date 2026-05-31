import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * Custom Fixtures
 * Extend Playwright's base test with app-specific fixtures.
 * Import { test, expect } from '@fixtures/base' instead of '@playwright/test'.
 *
 * This is a Day 10 concept — the file is scaffolded now so you can
 * see how it fits the architecture. Fill it in during Week 2.
 */

type AppFixtures = {
  loginPage: LoginPage;
  authenticatedPage: Page;
};

export const test = base.extend<AppFixtures>({
  // Provides a LoginPage instance automatically
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Provides a page that is already logged in
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginWithEnvCredentials();
    // Verify we landed on the inventory page before handing off
    await page.waitForURL('**/inventory.html');
    await use(page);
  },
});

export { expect } from '@playwright/test';
