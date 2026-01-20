import { Page, Locator } from '@playwright/test';
import * as locators from "../tests/ui-automation/Locators/HomePageLocators";

export class HomePage {
  readonly page: Page;
  readonly SEARCHBOX: Locator;
  readonly INPUT_SEARCHBOX: Locator;
  readonly PRICERANGE_BUTTON: Locator;
  readonly MINPRICE_INPUT: Locator;
  readonly MAXPRICE_INPUT: Locator;
  readonly SALEITEMS_CHECKBOX: Locator;
  readonly SEARCH_BUTTON: Locator;

  constructor(page: Page) {
    this.page = page;
    this.SEARCHBOX = page.locator(locators.SEARCHBOX);
    this.INPUT_SEARCHBOX = page.locator(locators.INPUT_SEARCHBOX);
    this.PRICERANGE_BUTTON = page.locator(locators.PRICERANGE_BUTTON);
    this.MINPRICE_INPUT = page.locator(locators.MINPRICE_INPUT);
    this.MAXPRICE_INPUT = page.locator(locators.MAXPRICE_INPUT);
    this.SALEITEMS_CHECKBOX = page.locator(locators.SALEITEMS_CHECKBOX);
    this.SEARCH_BUTTON = page.locator(locators.SEARCH_BUTTON);
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
      await this.SEARCHBOX.click();
      await this.SEARCHBOX.fill(productName);
      console.log(`Searched for product: ${productName}`);
    } catch (error) {
      console.error(`Failed to search for product "${productName}":`, error);
      throw error;
    }
  }

  async filterByPriceRangewithSales(minPrice: string, maxPrice: string): Promise<void> {
    try {
      await this.PRICERANGE_BUTTON.click();
      await this.MINPRICE_INPUT.fill(minPrice);
      await this.MAXPRICE_INPUT.fill(maxPrice);
      await this.SALEITEMS_CHECKBOX.check();
      await this.SEARCH_BUTTON.click();
      console.log(`Filtered by price range (${minPrice}-${maxPrice}) with sale items.`);
    } catch (error) {
      console.error(`Failed to filter by price range with sales (${minPrice}-${maxPrice}):`, error);
      throw error;
    }
  }

  async filterByPriceRange(minPrice: string, maxPrice: string): Promise<void> {
    try {
      await this.PRICERANGE_BUTTON.click();
      await this.MINPRICE_INPUT.fill(minPrice);
      await this.MAXPRICE_INPUT.fill(maxPrice);
      await this.SEARCH_BUTTON.click();
      console.log(`Filtered by price range (${minPrice}-${maxPrice}).`);
    } catch (error) {
      console.error(`Failed to filter by price range (${minPrice}-${maxPrice}):`, error);
      throw error;
    }
  }
}