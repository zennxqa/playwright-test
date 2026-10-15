import { playAudit } from 'playwright-lighthouse';
import { test, expect } from '../fixtures/lighthouse.fixture';

// Google's "good" Core Web Vitals thresholds: https://web.dev/articles/vitals
const THRESHOLDS = {
  performanceScore: 80, // 0-100
  lcp: 2500, // ms
  cls: 0.1,
  fcp: 1800, // ms
  tbt: 200, // ms, lab proxy for INP
};

test.describe('Home page Lighthouse', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Lighthouse requires Chromium');

  test('meets Core Web Vitals thresholds', async ({ homePage, page, lighthousePort }, testInfo) => {
    test.setTimeout(120_000);
    await homePage.goto();

    const { lhr } = await playAudit({
      page,
      port: lighthousePort,
      thresholds: { performance: THRESHOLDS.performanceScore },
      ignoreError: true,
      config: {
        extends: 'lighthouse:default',
        settings: {
          onlyCategories: ['performance'],
          // Matches Lighthouse's built-in desktop preset (desktop-config.js).
          formFactor: 'desktop',
          screenEmulation: { disabled: true },
          throttling: {
            rttMs: 40,
            throughputKbps: 10 * 1024,
            cpuSlowdownMultiplier: 1,
            requestLatencyMs: 0,
            downloadThroughputKbps: 0,
            uploadThroughputKbps: 0,
          },
        },
      },
      reports: {
        formats: { html: true },
        name: 'home-lighthouse',
        directory: testInfo.outputPath(),
      },
    });
    await testInfo.attach('lighthouse-report', {
      path: testInfo.outputPath('home-lighthouse.html'),
      contentType: 'text/html',
    });

    const score = (lhr.categories.performance.score ?? 0) * 100;
    const audit = (id: string) => lhr.audits[id].numericValue ?? Number.NaN;

    expect.soft(score, 'Performance score').toBeGreaterThanOrEqual(THRESHOLDS.performanceScore);
    expect.soft(audit('largest-contentful-paint'), 'LCP (ms)').toBeLessThanOrEqual(THRESHOLDS.lcp);
    expect.soft(audit('cumulative-layout-shift'), 'CLS').toBeLessThanOrEqual(THRESHOLDS.cls);
    expect.soft(audit('first-contentful-paint'), 'FCP (ms)').toBeLessThanOrEqual(THRESHOLDS.fcp);
    expect.soft(audit('total-blocking-time'), 'TBT (ms)').toBeLessThanOrEqual(THRESHOLDS.tbt);
  });
});
