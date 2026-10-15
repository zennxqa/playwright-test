import { chromium } from '@playwright/test';
import { test as base } from './pages.fixture';

type LighthouseWorkerFixtures = {
  lighthousePort: number;
};

/**
 * Page-object fixtures plus a Chromium browser launched with a remote debugging
 * port, which Lighthouse needs to attach. Use only in Chromium-only specs.
 */
export const test = base.extend<{}, LighthouseWorkerFixtures>({
  lighthousePort: [
    async ({}, use, workerInfo) => {
      await use(9222 + workerInfo.workerIndex);
    },
    { scope: 'worker' },
  ],
  browser: [
    async ({ lighthousePort }, use) => {
      const browser = await chromium.launch({ args: [`--remote-debugging-port=${lighthousePort}`] });
      await use(browser);
      await browser.close();
    },
    { scope: 'worker' },
  ],
});

export { expect } from '@playwright/test';
