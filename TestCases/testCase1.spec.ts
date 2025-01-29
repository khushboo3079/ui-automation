import { test, chromium, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';
import { ProductPage } from '../Pages/ProductPage';
test.describe('UI Automation - Test Case 1', () => {
  test('Search TV and add to shopping cart', async () => {
    test.setTimeout(200000);
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Initialize page objects
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    // Navigate to homepage
    await homePage.navigate();

    // Search for TVs
    await homePage.searchForProduct('TV');

    // Filter by price range
    await homePage.filterByPriceRangewithSales('500', '4000');

    // Add first item to cart
    await productPage.addFirstItemToCart();
    await page.screenshot({ path: 'first-click.png', fullPage: true });

    // Add third item to cart
    await productPage.addThirdItemToCart();
    await page.screenshot({ path: 'third-click.png', fullPage: true });

    // Go to cart
    await productPage.goToCart();

    // Verify subtotal
    
    const subtotal = await productPage.getSubtotal();
    console.log(`Cart subtotal: ${subtotal}`);
    expect(subtotal).toBeTruthy(); // Add more specific assertions as needed

    // Close browser
    await browser.close();
  });
});