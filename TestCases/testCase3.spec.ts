import { test, chromium, expect } from '@playwright/test';
import { ProductPage } from '../tests/ui-automation/pagesteps/ProductPage';
import { HomePage } from '../tests/ui-automation/pagesteps/HomePage';
import { CheckoutPage } from '../tests/ui-automation/pagesteps/CheckoutPage';

test.describe('UI Automation - Test Case 3', () => {
    test('Search TV and add to shopping cart', async () => {
        test.setTimeout(200000);
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();

        // Initialize page objects
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const checkoutPage = new CheckoutPage(page);

        try {
            // Navigate to homepage
            await homePage.navigate();
            // Search for TVs
            await homePage.searchForProduct('TV');
            // Filter by price range
            await homePage.filterByPriceRangewithSales('1500', '2500');
            await productPage.addItemToCart(2);
            await productPage.goToCart();
            await productPage.increaseQuantityOfItem(1);

            // Proceed to checkout
            await checkoutPage.clickOnCheckout();
            await checkoutPage.enterEmail('test@example.com');
           // await checkoutPage.validateProductandSubtotal();
        } catch (error) {
            console.error('Test failed:', error);
            await page.screenshot({ path: 'screenshots/test-failure.png' });
            throw error;
        } finally {
            await browser.close();
        }
    });
});