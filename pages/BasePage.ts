import { type Locator, type Page } from '@playwright/test';

/**
 * Shared header/navigation elements present on every playwright.dev page.
 */
export abstract class BasePage {
  readonly page: Page;
  readonly navbar: Locator;
  readonly logoLink: Locator;
  readonly docsLink: Locator;
  readonly apiLink: Locator;
  readonly languageDropdown: Locator;
  readonly searchButton: Locator;
  readonly themeToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = page.getByRole('navigation', { name: 'Main' });
    this.logoLink = this.navbar.getByRole('link', { name: /Playwright logo Playwright/ });
    this.docsLink = this.navbar.getByRole('link', { name: 'Docs' });
    this.apiLink = this.navbar.getByRole('link', { name: 'API' });
    this.languageDropdown = this.navbar.getByRole('button', { name: 'Node.js' });
    this.searchButton = page.getByRole('button', { name: /Search/ });
    this.themeToggle = page.getByRole('button', { name: /Switch between dark and light mode/ });
  }

  abstract readonly path: string;

  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }

  async openDocs(): Promise<void> {
    await this.docsLink.click();
  }

  async openApi(): Promise<void> {
    await this.apiLink.click();
  }
}
