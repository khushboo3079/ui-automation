import { Page, Locator } from '@playwright/test';

export class HomePage {
  private page: Page;
  private searchBoxpage: Locator;
  private searchBox: Locator;
  private priceRangeButton: Locator;
  private minPriceInput: Locator;
  private maxPriceInput: Locator;
  private saleItemsCheckbox: Locator;
  private searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBoxpage = page.locator('xpath=//*[@id="quicksearch-search-box"]');
    this.searchBox = page.locator('input.input-search');
    this.priceRangeButton = page.locator('button:has-text("Price Range")');
    this.minPriceInput = page.locator('input#min-input');
    this.maxPriceInput = page.locator('input#max-input');
    this.saleItemsCheckbox = page.locator('text=Sale items');
    this.searchButton = page.locator('button.search-price-range-dropdown--search[type="submit"]');
  }

  async navigate(): Promise<void> {
    try {
      await this.page.goto('https://www.jbhifi.com.au/');
      console.log('Navigated to the homepage successfully.');
    } catch (error) {
      console.error('Failed to navigate to the homepage:', error);
      throw error; // Re-throw the error to fail the test
    }
  }

  async searchForProduct(productName: string): Promise<void> {
    try {
      await this.searchBoxpage.click();
      await this.searchBox.fill(productName);
      console.log(`Searched for product: ${productName}`);
    } catch (error) {
      console.error(`Failed to search for product "${productName}":`, error);
      throw error;
    }
  }

  async filterByPriceRangewithSales(minPrice: string, maxPrice: string): Promise<void> {
    try {
      await this.priceRangeButton.click();
      await this.minPriceInput.fill(minPrice);
      await this.maxPriceInput.fill(maxPrice);
      await this.saleItemsCheckbox.check();
      await this.searchButton.click();
      console.log(`Filtered by price range (${minPrice}-${maxPrice}) with sale items.`);
    } catch (error) {
      console.error(`Failed to filter by price range with sales (${minPrice}-${maxPrice}):`, error);
      throw error;
    }
  }

  async filterByPriceRange(minPrice: string, maxPrice: string): Promise<void> {
    try {
      await this.priceRangeButton.click();
      await this.minPriceInput.fill(minPrice);
      await this.maxPriceInput.fill(maxPrice);
      await this.searchButton.click();
      console.log(`Filtered by price range (${minPrice}-${maxPrice}).`);
    } catch (error) {
      console.error(`Failed to filter by price range (${minPrice}-${maxPrice}):`, error);
      throw error;
    }
  }
}