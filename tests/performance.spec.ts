import { test, expect } from '../fixtures/pages.fixture';

// Google's "good" Core Web Vitals thresholds: https://web.dev/articles/vitals
const THRESHOLDS = {
  lcp: 2500, // ms
  cls: 0.1,
  fcp: 1800, // ms
  ttfb: 800, // ms
};

test.describe('Home page performance', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'LCP/CLS entries are Chromium-only');

  test('meets Core Web Vitals thresholds', async ({ homePage }) => {
    await homePage.goto();
    const vitals = await homePage.getWebVitals();
    test.info().annotations.push({ type: 'web-vitals', description: JSON.stringify(vitals) });

    expect.soft(vitals.lcp, 'LCP (ms)').toBeGreaterThan(0);
    expect.soft(vitals.lcp, 'LCP (ms)').toBeLessThanOrEqual(THRESHOLDS.lcp);
    expect.soft(vitals.cls, 'CLS').toBeLessThanOrEqual(THRESHOLDS.cls);
    expect.soft(vitals.fcp, 'FCP (ms)').toBeGreaterThan(0);
    expect.soft(vitals.fcp, 'FCP (ms)').toBeLessThanOrEqual(THRESHOLDS.fcp);
    expect.soft(vitals.ttfb, 'TTFB (ms)').toBeLessThanOrEqual(THRESHOLDS.ttfb);
  });
});
