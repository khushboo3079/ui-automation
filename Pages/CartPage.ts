import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToCart() {
    await this.page.locator('//span[contains(@class, "_16cfbrb4") and text()="Cart"]').click();
  }

  async verifyCartItemsCount(expectedCount: number) {
    const cartItems = this.page.locator('.cart-item');
    expect(await cartItems.count()).toBe(expectedCount);
  }

  async getCartSubtotal(): Promise<string> {
    const subtotal = await this.page.locator('.subtotal-amount').innerText();
    console.log(`Cart subtotal: ${subtotal}`);
    return subtotal;
  }
}