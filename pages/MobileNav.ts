import { type Locator, type Page } from '@playwright/test';

/** Collapsible navbar sidebar (hamburger menu) shown on narrow viewports. */
export class MobileNav {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly panel: Locator;
  readonly closeButton: Locator;
  readonly backToMainMenuButton: Locator;
  readonly themeToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.getByRole('button', { name: 'Toggle navigation bar' });
    this.panel = page.locator('.navbar-sidebar');
    this.closeButton = this.panel.getByRole('button', { name: 'Close navigation bar' });
    this.backToMainMenuButton = this.panel.getByRole('button', { name: /Back to main menu/ });
    this.themeToggle = this.panel.getByRole('button', { name: /Switch between dark and light mode/ });
  }

  link(name: string): Locator {
    return this.panel.getByRole('link', { name, exact: true });
  }

  async open(): Promise<void> {
    await this.menuButton.click();
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }

  async openLink(name: string): Promise<void> {
    await this.link(name).click();
  }
}
