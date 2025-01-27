import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToHomePage() {
    await this.page.goto('https://www.jbhifi.com.au/');
  }

  async searchForItem(item: string) {
    await this.page.locator('xpath=//*[@id="quicksearch-search-box"]').click();
    await this.page.locator('input.input-search').fill(item);
    await this.page.locator('input.input-search').press('Enter');
  }
}