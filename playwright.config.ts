import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'D:/ui-automation/TestCases', // Test directory
  retries: 1, // Retry tests once if they fail
  reporter: [['list'], ['html']], // Generate HTML report
  use: {
    baseURL: 'https://www.jbhifi.com.au/', // Base URL for tests
    headless: false, // Run tests in headless mode
    viewport: { width: 1280, height: 720 }, // Set the viewport size
    trace: 'on', // Record trace for debugging
    screenshot: 'only-on-failure', // Capture screenshots for failed tests
  },
});
