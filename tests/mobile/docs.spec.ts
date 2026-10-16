import { test, expect } from '../../fixtures/pages.fixture';

test.describe('Docs page (mobile)', () => {
  test.beforeEach(async ({ docsPage }) => {
    await docsPage.goto();
  });

  test('shows heading and hides the desktop sidebar', async ({ docsPage }) => {
    await expect(docsPage.heading).toHaveText('Installation');
    await expect(docsPage.sidebar).toBeHidden();
  });

  test('navigates via menu to Writing tests', async ({ mobileNav, docsPage, page }) => {
    await mobileNav.open();
    await mobileNav.openLink('Writing tests');
    await expect(page).toHaveURL(/\/docs\/writing-tests/);
    await expect(docsPage.heading).toHaveText('Writing tests');
  });

  test('next page link moves forward', async ({ docsPage, page }) => {
    await docsPage.goToNextPage();
    await expect(page).not.toHaveURL(/\/docs\/intro$/);
    await expect(docsPage.heading).toBeVisible();
  });
});
