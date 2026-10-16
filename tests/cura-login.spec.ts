import { test, expect } from '../fixtures/pages.fixture';

test.describe('CURA login with valid credentials', () => {
  test.beforeEach(async ({ curaLoginPage }) => {
    await curaLoginPage.goto();
  });

  test('Login page shows a Login heading, Username and Password fields and a Login button', async ({ curaLoginPage }) => {
    await expect(curaLoginPage.heading).toBeVisible();
    await expect(curaLoginPage.usernameInput).toBeVisible();
    await expect(curaLoginPage.usernameInput).toBeEditable();
    await expect(curaLoginPage.passwordInput).toBeVisible();
    await expect(curaLoginPage.passwordInput).toHaveAttribute('type', 'password');
    await expect(curaLoginPage.loginButton).toBeVisible();
  });

  test('valid credentials take the user from the login form to the signed-in area', async ({ curaLoginPage, page }) => {
    await curaLoginPage.login(await curaLoginPage.validCredentials());

    await expect(page).not.toHaveURL(/profile\.php/);
    await expect(page).toHaveURL(/#appointment$/);
    await expect(curaLoginPage.appointmentHeading).toBeVisible();
    await expect(curaLoginPage.loginButton).toBeHidden();
  });

  test('signed-in user no longer sees the login form when returning to the Login link', async ({ curaLoginPage, page }) => {
    await curaLoginPage.login(await curaLoginPage.validCredentials());
    await expect(curaLoginPage.appointmentHeading).toBeVisible();

    await curaLoginPage.goto();

    await expect(page).toHaveURL(/profile\.php/);
    await expect(curaLoginPage.heading).toBeHidden();
    await expect(curaLoginPage.usernameInput).toBeHidden();
    await expect(curaLoginPage.passwordInput).toBeHidden();
    await expect(curaLoginPage.loginButton).toBeHidden();
  });
});
