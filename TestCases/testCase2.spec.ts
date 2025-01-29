import { test, chromium, expect } from '@playwright/test';
import { ProductPage } from '../Pages/ProductPage';
import { HomePage } from '../Pages/HomePage';

test.describe('UI Automation - Test Case 2', () => {
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
    await homePage.filterByPriceRange('1000', '2000');
    await productPage.addItemToCart(3);
    // Go to cart
    await productPage.goToCart();
    await productPage.increaseQuantityOfItem(0);
    // Check availability
    // await productPage.increaseQuantityOfItem();
    await productPage.clickOnViewCart();
    await productPage.checkAvailability('3004');
    // Validate availability options
    await productPage.validateAvailabilityOptions();
  });
});