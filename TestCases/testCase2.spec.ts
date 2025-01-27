import { test, expect } from '@playwright/test';

test.describe('UI Automation - Test Case 2', () => {
  test('Search TV, add TVs to cart, validate availability', async ({ page }) => {
    await page.goto('/');

    // Search for TVs
    await page.fill('input[aria-label="Search"]', 'TV');
    await page.press('input[aria-label="Search"]', 'Enter');

    // Filter price range
    await page.click('button:has-text("Price Range")');
    await page.fill('input[placeholder="Min"]', '1000');
    await page.fill('input[placeholder="Max"]', '2000');
    await page.uncheck('text=Include Sales Items');

    await page.click('button:has-text("Search")');

    // Add the first 3 TVs to cart
    for (let i = 0; i < 3; i++) {
      const product = await page.locator('.product-tile').nth(i);
      await product.locator('button:has-text("Add to Cart")').click();
    }

    // Go to cart
    await page.click('button[aria-label="Cart"]');

    // Increase quantity of the first product
    const firstCartItem = page.locator('.cart-item').nth(0);
    await firstCartItem.locator('button[aria-label="Increase quantity"]').click();

    // Check availability
    await page.click('button:has-text("Check Availability")');
    await page.fill('input[placeholder="Enter postcode"]', '3000');
    await page.click('text=Melbourne VIC 3004');

    // Validate availability options
    expect(await page.isVisible('text=Delivery')).toBeTruthy();
    expect(await page.isVisible('text=Click & Collect')).toBeTruthy();
    expect(await page.isVisible('text=In-store')).toBeTruthy();
  });
});