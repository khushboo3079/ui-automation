import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 350 * 1000,
  testDir: "./",
  fullyParallel: true,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,

  reporter: [
    process.env.CI ? ['list'] : ['line'],

    [
      'monocart-reporter',
      {
        outputFile: './test-result.report.html',
      },
    ],

    [
      'junit',
      {
        outputFile: './test-results/results.xml',
      },
    ],
  ],

  use: {
    headless: true,
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'on',
  },

  projects: [
    {
      name: 'ui-automation',
      testDir: 'D:/ui-automation/TestCases',
      use: {
        browserName: 'chromium',
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
          slowMo: 500,
        },
      },
    },

    {
      name: 'API-automation',
      testDir: 'D:/api-automation/TestCases',
      use: {
        browserName: 'chromium',
        viewport: null,
        launchOptions: {
          slowMo: 5000,
        }
      },
    },
  ],
};