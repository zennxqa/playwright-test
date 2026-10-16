import { test, expect } from '../../fixtures/pages.fixture';

test.describe('Home page (mobile)', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('shows hero heading', async ({ homePage }) => {
    await expect(homePage.heroTitle).toContainText('Playwright enables reliable');
  });

  test('has no horizontal overflow', async ({ page }) => {
    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflows).toBe(false);
  });

  test('menu button opens and closes the nav panel', async ({ mobileNav }) => {
    await expect(mobileNav.menuButton).toBeVisible();
    await mobileNav.open();
    await expect(mobileNav.link('Docs')).toBeVisible();
    await expect(mobileNav.link('API')).toBeVisible();
    await mobileNav.close();
    await expect(mobileNav.link('Docs')).toBeHidden();
  });

  test('Docs link in menu navigates to installation docs', async ({ mobileNav, docsPage, page }) => {
    await mobileNav.open();
    await mobileNav.openLink('Docs');
    await expect(page).toHaveURL(/\/docs\/intro/);
    await expect(docsPage.heading).toHaveText('Installation');
  });

  test('Get started navigates to installation docs', async ({ homePage, docsPage, page }) => {
    await homePage.clickGetStarted();
    await expect(page).toHaveURL(/\/docs\/intro/);
    await expect(docsPage.heading).toHaveText('Installation');
  });

  test('theme toggle in menu switches color mode', async ({ mobileNav, page }) => {
    const html = page.locator('html');
    const before = await html.getAttribute('data-theme-choice');
    await mobileNav.open();
    await mobileNav.themeToggle.click();
    await expect(html).not.toHaveAttribute('data-theme-choice', before ?? '');
  });
});
