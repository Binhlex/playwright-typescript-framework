import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import users from '../../test-data/users.json';

/**
 * Login UI Tests  @smoke @regression
 *
 * Target: https://www.saucedemo.com
 * Covers: successful login, locked user error, empty fields error
 */

test.describe('Login page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('page loads and shows login form @smoke', async () => {
    await loginPage.assertLoginPage();
    await loginPage.assertVisible(loginPage.usernameInput);
    await loginPage.assertVisible(loginPage.passwordInput);
    await loginPage.assertVisible(loginPage.loginButton);
  });

  test('valid credentials redirect to inventory @smoke', async ({ page }) => {
    const user = users.validUsers[0];
    await loginPage.login(user.username, user.password);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('locked out user sees error message @regression', async () => {
    const locked = users.invalidUsers[0];
    await loginPage.login(locked.username, locked.password);
    await loginPage.assertErrorMessage(locked.expectedError);
  });

  test('empty credentials shows required field error @regression', async () => {
    const empty = users.invalidUsers[2];
    await loginPage.login(empty.username, empty.password);
    await loginPage.assertErrorMessage(empty.expectedError);
  });

  test('wrong credentials shows mismatch error @regression', async () => {
    const wrong = users.invalidUsers[1];
    await loginPage.login(wrong.username, wrong.password);
    await loginPage.assertErrorMessage(wrong.expectedError);
  });
});
