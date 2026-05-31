import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage
 * Page Object for https://www.saucedemo.com login screen.
 * Demonstrates the POM pattern you'll build in Week 2.
 */
export class LoginPage extends BasePage {
  // ── Locators ───────────────────────────────────────────────────────────────
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton   = page.getByRole('button', { name: 'Login' });
    this.errorMessage  = page.locator('[data-test="error"]');
  }

  // ── Actions ────────────────────────────────────────────────────────────────

  async goto() {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  async login(username: string, password: string) {
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }

  async loginWithEnvCredentials() {
    const user = process.env.STANDARD_USER ?? 'standard_user';
    const pass = process.env.TEST_PASSWORD  ?? 'secret_sauce';
    await this.login(user, pass);
  }

  // ── Assertions ─────────────────────────────────────────────────────────────

  async assertErrorMessage(text: string) {
    await this.assertVisible(this.errorMessage);
    await this.assertText(this.errorMessage, text);
  }

  async assertLoginPage() {
    await this.assertTitle('Swag Labs');
    await this.assertVisible(this.loginButton);
  }
}
