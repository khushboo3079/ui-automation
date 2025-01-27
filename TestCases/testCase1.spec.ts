import { test } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';
import { SearchResultsPage } from '../Pages/SearchResultsPage';
import { CartPage } from '../Pages/CartPage';

test.describe('UI Automation - Test Case 1', () => {
  test('Search TV and add to shopping cart', async ({ page }) => {
    test.setTimeout(100000);

    // Initialize page objects
    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const cartPage = new CartPage(page);

    // Step 1: Navigate to homepage
    await homePage.navigateToHomePage();

    // Step 2: Search for TVs
    await homePage.searchForItem('TV');

    // Step 3: Filter by price range
    await searchResultsPage.filterPriceRange('500', '4000');

    // Step 4: Add first and third items to cart
    console.log('Adding first item to cart...');
    await searchResultsPage.addItemToCart(0);
    await searchResultsPage.closeSlideOut();

    console.log('Adding third item to cart...');
    await searchResultsPage.addItemToCart(2);

    // Step 5: Go to cart and verify
    await cartPage.goToCart();
    await cartPage.verifyCartItemsCount(2);
    const subtotal = await cartPage.getCartSubtotal();

    console.log(`Cart subtotal: ${subtotal}`);
  });
});