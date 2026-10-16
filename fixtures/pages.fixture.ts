import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { DocsPage } from '../pages/DocsPage';
import { SearchModal } from '../pages/SearchModal';
import { MobileNav } from '../pages/MobileNav';

type Pages = {
  homePage: HomePage;
  docsPage: DocsPage;
  searchModal: SearchModal;
  mobileNav: MobileNav;
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
  mobileNav: async ({ page }, use) => {
    await use(new MobileNav(page));
  },
});

export { expect } from '@playwright/test';
