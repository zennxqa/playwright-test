import { test, expect } from '../fixtures/pages.fixture';

test.describe('Docs page', () => {
  test.beforeEach(async ({ docsPage }) => {
    await docsPage.goto();
  });

  test('shows Installation heading and sidebar', async ({ docsPage }) => {
    await expect(docsPage.heading).toHaveText('Installation');
    await expect(docsPage.sidebar).toBeVisible();
  });

  test('navigates via sidebar to Writing tests', async ({ docsPage, page }) => {
    await docsPage.openSidebarItem('Writing tests');
    await expect(page).toHaveURL(/\/docs\/writing-tests/);
    await expect(docsPage.heading).toHaveText('Writing tests');
  });

  test('next page link moves forward', async ({ docsPage, page }) => {
    await docsPage.goToNextPage();
    await expect(page).not.toHaveURL(/\/docs\/intro$/);
    await expect(docsPage.heading).toBeVisible();
  });

  test('API link opens API reference', async ({ docsPage, page }) => {
    await docsPage.openApi();
    await expect(page).toHaveURL(/\/docs\/api\/class-playwright/);
  });
});
