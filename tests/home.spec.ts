import { test, expect } from '../fixtures/pages.fixture';

test.describe('Home page', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('shows hero heading', async ({ homePage }) => {
    await expect(homePage.heroTitle).toContainText('Playwright enables reliable');
  });

  test('displays main navigation links', async ({ homePage }) => {
    await expect(homePage.logoLink).toBeVisible();
    await expect(homePage.docsLink).toBeVisible();
    await expect(homePage.apiLink).toBeVisible();
  });

  test('Get started navigates to installation docs', async ({ homePage, docsPage, page }) => {
    await homePage.clickGetStarted();
    await expect(page).toHaveURL(/\/docs\/intro/);
    await expect(docsPage.heading).toHaveText('Installation');
  });

  test('theme toggle switches color mode', async ({ homePage, page }) => {
    // Toggle cycles system -> light -> dark; track the explicit choice attribute.
    const html = page.locator('html');
    const before = await html.getAttribute('data-theme-choice');
    await homePage.themeToggle.click();
    await expect(html).not.toHaveAttribute('data-theme-choice', before ?? '');
  });
});
