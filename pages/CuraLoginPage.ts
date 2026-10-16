import { type Locator, type Page } from '@playwright/test';

/** The CURA demo app is a different site from the suite's baseURL (playwright.dev), so URLs are absolute. */
export const CURA_BASE_URL = 'https://katalon-demo-cura.herokuapp.com';

export type Credentials = { username: string; password: string };

/**
 * Standalone page object for the CURA Healthcare Login page (/profile.php#login).
 */
export class CuraLoginPage {
  readonly page: Page;
  readonly url = `${CURA_BASE_URL}/profile.php#login`;
  readonly heading: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly demoUsername: Locator;
  readonly demoPassword: Locator;
  readonly appointmentHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    const loginSection = page.locator('#login');
    this.heading = loginSection.getByRole('heading', { name: 'Login', level: 2 });
    // The section also shows a read-only "Demo account" box with textboxes of the same names,
    // so the real form inputs are scoped by id.
    this.usernameInput = loginSection.locator('#txt-username');
    this.passwordInput = loginSection.locator('#txt-password');
    this.loginButton = loginSection.getByRole('button', { name: 'Login' });
    this.demoUsername = loginSection.getByRole('textbox', { name: 'Username' }).and(page.locator(':not(#txt-username)'));
    this.demoPassword = loginSection.getByRole('textbox', { name: 'Password' }).and(page.locator(':not(#txt-password)'));
    // Shown in the signed-in area after a successful login.
    this.appointmentHeading = page.getByRole('heading', { name: 'Make Appointmentx', level: 2 });
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  /**
   * Credentials from CURA_USERNAME / CURA_PASSWORD when set; otherwise the public
   * demo account that the Login page itself displays. Call after goto().
   */
  async validCredentials(): Promise<Credentials> {
    const { CURA_USERNAME, CURA_PASSWORD } = process.env;
    if (CURA_USERNAME && CURA_PASSWORD) {
      return { username: CURA_USERNAME, password: CURA_PASSWORD };
    }
    return {
      username: await this.demoUsername.inputValue(),
      password: await this.demoPassword.inputValue(),
    };
  }

  async login({ username, password }: Credentials): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
