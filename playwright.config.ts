import { defineConfig, devices } from '@playwright/test';

/**
 * Each practice site gets its own project so contributors can run
 * `npx playwright test --project=saucedemo` and only touch that site.
 * baseURL lives on the project, not globally, since every site is a
 * different origin. See https://playwright.dev/docs/test-projects.
 *
 * The browser a project runs in is Chromium by default (fast PR feedback).
 * Set BROWSER=firefox|webkit to run the same projects against another
 * engine, e.g. in the nightly/main full-matrix workflow.
 */
const browserDeviceName: Record<string, keyof typeof devices> = {
  chromium: 'Desktop Chrome',
  firefox: 'Desktop Firefox',
  webkit: 'Desktop Safari',
};
const browser = (process.env.BROWSER ?? 'chromium') as keyof typeof browserDeviceName;
const browserDevice = devices[browserDeviceName[browser] ?? browserDeviceName.chromium];

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'html',
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'automationintesting',
      testDir: './tests/ui/automationintesting',
      use: {
        ...browserDevice,
        baseURL: 'https://automationintesting.online',
      },
    },
    {
      name: 'qaautomationlabs',
      testDir: './tests/ui/qaautomationlabs',
      use: {
        ...browserDevice,
        baseURL: 'https://testing.qaautomationlabs.com',
      },
    },
    {
      name: 'saucedemo',
      testDir: './tests/ui/saucedemo',
      use: {
        ...browserDevice,
        baseURL: 'https://www.saucedemo.com',
      },
    },
    {
      name: 'the-internet',
      testDir: './tests/ui/the-internet',
      use: {
        ...browserDevice,
        baseURL: 'https://the-internet.herokuapp.com',
      },
    },
    {
      name: 'demoqa',
      testDir: './tests/ui/demoqa',
      use: {
        ...browserDevice,
        baseURL: 'https://demoqa.com',
      },
    },
    {
      name: 'uitestingplayground',
      testDir: './tests/ui/uitestingplayground',
      use: {
        ...browserDevice,
        baseURL: 'https://www.uitestingplayground.com',
      },
    },
    {
      name: 'api-automationintesting',
      testDir: './tests/api/automationintesting',
      use: {
        baseURL: 'https://automationintesting.online',
      },
    },
  ],
});
