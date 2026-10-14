import { test, expect } from '../fixtures/pages.fixture';

test.describe('Search', () => {
  test('finds results for "locator"', async ({ homePage, searchModal }) => {
    await homePage.goto();
    await homePage.searchButton.click();
    await expect(searchModal.modal).toBeVisible();

    await searchModal.search('locator');
    await expect(searchModal.results.first()).toBeVisible();
    await expect(searchModal.results.first()).toContainText(/locator/i);
  });
});
