import { Page } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async filterPriceRange(min: string, max: string) {
    await this.page.click('button:has-text("Price Range")');
    await this.page.locator('xpath=//input[@id="min-input"]').fill(min);
    await this.page.locator('xpath=//input[@id="max-input"]').fill(max);
    const saleCheckbox = this.page.locator('text= Sale items');
    if (!(await saleCheckbox.isChecked())) {
      await saleCheckbox.check();
    }
    await this.page.locator('button.search-price-range-dropdown--search[type="submit"]').click();
  }

  async addItemToCart(itemIndex: number) {
    const addToCartButton = this.page
      .locator('span.Button_labelVariants_button__ickenod:has-text("Add to cart")')
      .nth(itemIndex);
    await addToCartButton.scrollIntoViewIfNeeded();
    await addToCartButton.click();
  }

  async closeSlideOut() {
    await this.page.getByTestId('slideout-close-button').click();
  }
}