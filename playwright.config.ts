import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'https://playwright.dev',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    // Desktop: everything except tests/mobile
    { name: 'chromium', testIgnore: '**/mobile/**', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', testIgnore: '**/mobile/**', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', testIgnore: '**/mobile/**', use: { ...devices['Desktop Safari'] } },
    // Mobile viewports: only tests/mobile
    { name: 'mobile-chrome', testMatch: '**/mobile/**/*.spec.ts', use: { ...devices['Pixel 7'] } },
    { name: 'mobile-safari', testMatch: '**/mobile/**/*.spec.ts', use: { ...devices['iPhone 14'] } },
  ],
});
