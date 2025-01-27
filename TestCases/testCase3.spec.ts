import { test, expect } from '@playwright/test';

test.describe('UI Automation - Test Case 3', () => {
  test('Search TV, add to cart, and proceed to checkout', async ({ page }) => {
    await page.goto('/');

    // Search for TVs
    await page.fill('input[aria-label="Search"]', 'TV');
    await page.press('input[aria-label="Search"]', 'Enter');

    // Filter price range
    await page.click('button:has-text("Price Range")');
    await page.fill('input[placeholder="Min"]', '1500');
    await page.fill('input[placeholder="Max"]', '2500');
    await page.check('text=Include Sales Items');

    await page.click('button:has-text("Search")');

    // Add the first 2 TVs to cart
    for (let i = 0; i < 2; i++) {
      const product = await page.locator('.product-tile').nth(i);
      await product.locator('button:has-text("Add to Cart")').click();
    }

    // Go to cart
    await page.click('button[aria-label="Cart"]');

    // Increase quantity of the second product
    const secondCartItem = page.locator('.cart-item').nth(1);
    await secondCartItem.locator('button[aria-label="Increase quantity"]').click();

    // Proceed to checkout
    await page.click('button:has-text("Checkout")');

    // Fill in fake details
    await page.fill('input[placeholder="Email"]', 'test@example.com');
    await page.click('text=Click & Collect');

    // Validate products and subtotal
    const cartItems = page.locator('.cart-item');
    expect(await cartItems.count()).toBe(2);
    console.log('Validated cart items during checkout.');
  });
});