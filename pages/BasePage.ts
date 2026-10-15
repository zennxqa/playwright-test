import { type Locator, type Page } from '@playwright/test';

/** Core Web Vitals in milliseconds (CLS is unitless). */
export type WebVitals = {
  lcp: number;
  cls: number;
  fcp: number;
  ttfb: number;
};

/**
 * Shared header/navigation elements present on every playwright.dev page.
 */
export abstract class BasePage {
  readonly page: Page;
  readonly navbar: Locator;
  readonly logoLink: Locator;
  readonly docsLink: Locator;
  readonly apiLink: Locator;
  readonly languageDropdown: Locator;
  readonly searchButton: Locator;
  readonly themeToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = page.getByRole('navigation', { name: 'Main' });
    this.logoLink = this.navbar.getByRole('link', { name: /Playwright logo Playwright/ });
    this.docsLink = this.navbar.getByRole('link', { name: 'Docs' });
    this.apiLink = this.navbar.getByRole('link', { name: 'API' });
    this.languageDropdown = this.navbar.getByRole('button', { name: 'Node.js' });
    this.searchButton = page.getByRole('button', { name: /Search/ });
    this.themeToggle = page.getByRole('button', { name: /Switch between dark and light mode/ });
  }

  abstract readonly path: string;

  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }

  async openDocs(): Promise<void> {
    await this.docsLink.click();
  }

  async openApi(): Promise<void> {
    await this.apiLink.click();
  }

  /**
   * Reads Core Web Vitals for the current page from the browser Performance API.
   * LCP and CLS entries are Chromium-only; call after goto().
   */
  async getWebVitals(): Promise<WebVitals> {
    return this.page.evaluate(
      () =>
        new Promise<WebVitals>((resolve) => {
          const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
          const fcp = performance.getEntriesByName('first-contentful-paint')[0];
          const vitals: WebVitals = {
            lcp: 0,
            cls: 0,
            fcp: fcp?.startTime ?? 0,
            ttfb: nav?.responseStart ?? 0,
          };

          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            vitals.lcp = entries[entries.length - 1].startTime;
          }).observe({ type: 'largest-contentful-paint', buffered: true });

          new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) {
              if (!entry.hadRecentInput) vitals.cls += entry.value;
            }
          }).observe({ type: 'layout-shift', buffered: true });

          // Buffered observer callbacks are delivered asynchronously.
          setTimeout(() => resolve(vitals), 1000);
        }),
    );
  }
}
