import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Playwright Configuration
 * Docs: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Directory where tests are located
  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build on CI if test.only is accidentally left in
  forbidOnly: !!process.env.CI,

  // Retry failed tests on CI only
  retries: process.env.CI ? 2 : 0,

  // Number of parallel workers
  workers: process.env.CI ? 2 : undefined,

  // Reporter config
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  // Global test settings
  use: {
    // Base URL for page.goto('/') calls
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',

    // Capture screenshot on failure
    screenshot: 'only-on-failure',

    // Record video on first retry
    video: 'on-first-retry',

    // Trace on first retry for debugging
    trace: 'on-first-retry',

    // Default timeout for actions (click, fill, etc.)
    actionTimeout: 10_000,

    // Default timeout for navigation
    navigationTimeout: 30_000,
  },

  // Default test timeout
  timeout: 60_000,

  // Expect assertion timeout
  expect: {
    timeout: 10_000,
  },

  // Output directory for test artifacts
  outputDir: 'test-results/',

  // Browser projects
  projects: [
    // ── UI Tests ────────────────────────────────────────────────────────────

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: 'tests/ui/**/*.spec.ts',
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testMatch: 'tests/ui/**/*.spec.ts',
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testMatch: 'tests/ui/**/*.spec.ts',
    },

    // ── Mobile Emulation ────────────────────────────────────────────────────

    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
      testMatch: 'tests/ui/**/*.spec.ts',
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'] },
      testMatch: 'tests/ui/**/*.spec.ts',
    },

    // ── API Tests (no browser needed) ───────────────────────────────────────

    {
      name: 'api',
      use: {
        baseURL: process.env.API_BASE_URL || 'https://reqres.in',
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      },
      testMatch: 'tests/api/**/*.spec.ts',
    },
  ],
});
