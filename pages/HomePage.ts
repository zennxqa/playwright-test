import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly path = '/';
  readonly heroTitle: Locator;
  readonly getStartedButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heroTitle = page.locator('h1.hero__title');
    this.getStartedButton = page.getByRole('link', { name: 'Get started' });
  }

  async clickGetStarted(): Promise<void> {
    await this.getStartedButton.click();
  }
}
