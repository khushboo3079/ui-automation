import { Page, Locator } from '@playwright/test';
import * as locators from '../Locators/SearchResults';

export class SearchResultsPage {
  readonly page: Page;
  readonly PRICE_RANGE:Locator;
  readonly MINIMUM_RANGE:Locator;
  readonly MAXIMUM_RANGE:Locator;
  readonly SALE_CHECKBOX:Locator;
  readonly ADD_PRODUCT_GRID:Locator;
  readonly ADD_TO_CART_BUTTON:Locator;
  readonly SLIDOUT_CART_BUTTON:Locator;


  constructor(page: Page) {
    this.page = page;
    this.PRICE_RANGE=page.locator(locators.PRICE_RANGE);
    this.MINIMUM_RANGE=page.locator(locators.MINIMUM_RANGE);
    this.MAXIMUM_RANGE=page.locator(locators.MAXIMUM_RANGE);
    this.SALE_CHECKBOX=page.locator(locators.SALE_CHECKBOX);  
    this.ADD_PRODUCT_GRID=page.locator(locators.ADD_PRODUCT_GRID);
    this.ADD_TO_CART_BUTTON=page.locator(locators.ADD_TO_CART_BUTTON);
    this.SLIDOUT_CART_BUTTON=page.getByTestId(locators.SLIDOUT_CART_BUTTON);
  }

  async filterPriceRange(min: string, max: string) {
    await this.PRICE_RANGE.click();
    await this.MINIMUM_RANGE.fill(min);
    await this.MAXIMUM_RANGE.fill(max);
    const saleCheckbox = this.SALE_CHECKBOX;
    if (!(await saleCheckbox.isChecked())) {
      await saleCheckbox.check();
    }
    await this.page.locator('button.search-price-range-dropdown--search[type="submit"]').click();
  }

  async addItemToCart(itemIndex: number) {
    const addToCartButton = this.ADD_TO_CART_BUTTON
      .nth(itemIndex);
    await addToCartButton.scrollIntoViewIfNeeded();
    await addToCartButton.click();
  }

  async closeSlideOut() {
    await this.SLIDOUT_CART_BUTTON.click();
  }
}