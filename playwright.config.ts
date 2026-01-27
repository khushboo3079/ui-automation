import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 350 * 1000,
  testDir: "./TestCases",
  fullyParallel: false,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],

  use: {
    headless: true,
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'on',
  },

  projects: [
    {
      name: 'chromium',
      testDir: './TestCases',
      use: {
        browserName: 'chromium',
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
          slowMo: 500,
        },
      },
    },
  ],
};

export default config;