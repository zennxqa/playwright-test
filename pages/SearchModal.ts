import { type Locator, type Page } from '@playwright/test';

/** Algolia DocSearch modal opened from the navbar. */
export class SearchModal {
  readonly page: Page;
  readonly modal: Locator;
  readonly input: Locator;
  readonly results: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.locator('.DocSearch-Modal');
    this.input = page.locator('#docsearch-input');
    this.results = page.locator('.DocSearch-Hit');
  }

  async search(term: string): Promise<void> {
    await this.input.fill(term);
  }

  async openFirstResult(): Promise<void> {
    await this.results.first().click();
  }
}
