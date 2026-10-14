import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DocsPage extends BasePage {
  readonly path = '/docs/intro';
  readonly heading: Locator;
  readonly sidebar: Locator;
  readonly tableOfContents: Locator;
  readonly nextPageLink: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('article h1');
    this.sidebar = page.getByRole('navigation', { name: 'Docs sidebar' });
    this.tableOfContents = page.locator('.table-of-contents');
    this.nextPageLink = page.locator('a.pagination-nav__link--next');
  }

  async openSidebarItem(name: string): Promise<void> {
    await this.sidebar.getByRole('link', { name, exact: true }).click();
  }

  async goToNextPage(): Promise<void> {
    await this.nextPageLink.click();
  }
}
