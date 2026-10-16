import { type Locator, type Page } from '@playwright/test';
import { CURA_BASE_URL } from './CuraLoginPage';

/**
 * Standalone page object for the CURA Healthcare landing page (/).
 */
export class CuraHomePage {
  readonly page: Page;
  readonly url = `${CURA_BASE_URL}/`;
  readonly headerTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    // "CURA Healthcare Service" h1 in the landing page banner.
    this.headerTitle = page.locator('#top > div > h1');
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }
}
