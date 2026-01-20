import { Page, Locator, expect } from '@playwright/test';
import * as locators from "../Locators/ProductPageLocators";

export class ProductPage {
  readonly page: Page;
  readonly ADDTOCART_BUTTON: Locator;
  readonly SLIDOUT_CART_BUTTON: Locator;
  readonly THIRD_ADD_TO_CART_BUTTON_ITEM: Locator;
  readonly CART_BUTTON: Locator;
  readonly SUBTOTAL_AMOUNT: Locator;
  readonly INCREASE_QUANTITY: Locator;
  readonly VIEW_CART: Locator;
  readonly BTN_CHECK_AVILABILITY: Locator;
  readonly INPUT_POSTCODE: Locator;
  readonly SELECT_MELBOURNE: Locator;
  readonly DELIVERY_OPTION: Locator;
  readonly CLICK_AND_COLLECT: Locator;
  readonly IN_STORE: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ADDTOCART_BUTTON = page.locator(locators.ADDTOCART_BUTTON);
    this.SLIDOUT_CART_BUTTON = page.getByTestId(locators.SLIDOUT_CART_BUTTON);
    this.THIRD_ADD_TO_CART_BUTTON_ITEM = page.locator(locators.THIRD_ADD_TO_CART_BUTTON_ITEM);
    this.CART_BUTTON = page.locator(locators.CART_BUTTON);
    this.SUBTOTAL_AMOUNT = page.locator(locators.SUBTOTAL_AMOUNT);
    this.INCREASE_QUANTITY = page.locator(locators.INCREASE_QUANTITY);
    this.VIEW_CART = page.locator(locators.VIEW_CART);
    this.BTN_CHECK_AVILABILITY = page.locator(locators.BTN_CHECK_AVILABILITY);
    this.INPUT_POSTCODE = page.locator(locators.INPUT_POSTCODE);
    this.SELECT_MELBOURNE = page.locator(locators.SELECT_MELBOURNE);
    this.DELIVERY_OPTION = page.locator(locators.DELIVERY_OPTION);
    this.CLICK_AND_COLLECT = page.locator(locators.CLICK_AND_COLLECT);
    this.IN_STORE = page.locator(locators.IN_STORE).first(); 

  }

  async addFirstItemToCart(): Promise<void> {
    try {
      await this.ADDTOCART_BUTTON.first().click();
      await this.SLIDOUT_CART_BUTTON.click();
      console.log('First item added to cart successfully.');
    } catch (error) {
      console.error('Failed to add the first item to cart:', error);
      throw error;
    }
  }

  async addThirdItemToCart(): Promise<void> {
    try {
      await this.THIRD_ADD_TO_CART_BUTTON_ITEM.nth(2).waitFor({ state: 'visible', timeout: 60000 });
      await this.THIRD_ADD_TO_CART_BUTTON_ITEM.nth(2).dblclick();
      await this.SLIDOUT_CART_BUTTON.click();
      console.log('Third item added to cart successfully.');
    } catch (error) {
      console.error('Failed to add the third item to cart:', error);
      throw error;
    }
  }

  async addItemToCart(itemNumber: number): Promise<void> {
    try {
      for (let i = 0; i < itemNumber; i++) {
        await this.THIRD_ADD_TO_CART_BUTTON_ITEM.nth(i).dblclick();
        await this.SLIDOUT_CART_BUTTON.waitFor({ state: 'visible', timeout: 100000 });
        await this.SLIDOUT_CART_BUTTON.click();
      }
      console.log(`Added ${itemNumber} items to cart successfully.`);
    } catch (error) {
      console.error(`Failed to add ${itemNumber} items to cart:`, error);
      throw error;
    }
  }

  async goToCart(): Promise<void> {
    try {
      await this.CART_BUTTON.click();
      console.log('Navigated to the cart successfully.');
    } catch (error) {
      console.error('Failed to navigate to the cart:', error);
      throw error;
    }
  }

  async getSubtotal(): Promise<string> {
    try {
      const subtotal = await this.SUBTOTAL_AMOUNT.innerText();
      console.log('Subtotal amount:', subtotal);
      return subtotal;
    } catch (error) {
      console.error('Failed to get the subtotal amount:', error);
      throw error;
    }
  }

  async increaseQuantityOfItem(itemNumber: number): Promise<void> {
    try {
      await this.INCREASE_QUANTITY.nth(itemNumber).click();
      console.log(`Increased quantity of item ${itemNumber} successfully.`);
    } catch (error) {
      console.error(`Failed to increase quantity of item ${itemNumber}:`, error);
      throw error;
    }
  }

  async clickOnViewCart(): Promise<void> {
    try {
      await this.VIEW_CART.click();
      console.log('Clicked on "View Cart" successfully.');
    } catch (error) {
      console.error('Failed to click on "View Cart":', error);
      throw error;
    }
  }

  async checkAvailability(pincode: string): Promise<void> {
    try {
      await this.BTN_CHECK_AVILABILITY.click();
      await this.INPUT_POSTCODE.click();
      await this.INPUT_POSTCODE.fill(pincode);
      await this.SELECT_MELBOURNE.click();
      console.log(`Checked availability for pincode ${pincode} successfully.`);
    } catch (error) {
      console.error(`Failed to check availability for pincode ${pincode}:`, error);
      throw error;
    }
  }

  async validateAvailabilityOptions(): Promise<void> {
    try {
      await this.DELIVERY_OPTION.waitFor({ state: 'visible', timeout: 60000 });
      await this.CLICK_AND_COLLECT.waitFor({ state: 'visible', timeout: 60000 });
      await expect(this.DELIVERY_OPTION).toBeVisible();
      await expect(this.CLICK_AND_COLLECT).toBeVisible();
      await expect(this.IN_STORE).toBeVisible();
      console.log('All availability options are visible.');
    } catch (error) {
      console.error('Failed to validate availability options:', error);
      throw error;
    }
  }
}