import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { DocsPage } from '../pages/DocsPage';
import { SearchModal } from '../pages/SearchModal';

type Pages = {
  homePage: HomePage;
  docsPage: DocsPage;
  searchModal: SearchModal;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  docsPage: async ({ page }, use) => {
    await use(new DocsPage(page));
  },
  searchModal: async ({ page }, use) => {
    await use(new SearchModal(page));
  },
});

export { expect } from '@playwright/test';
