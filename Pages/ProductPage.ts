import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  private page: Page;
  private addToCartButton: Locator;
  private slidoutCartButton: Locator;
  private thirdaddToCartButtonitem: Locator;
  private cartButton: Locator;
  private subtotalAmount: Locator;
  private increaseQuantity: Locator;
  private viewCart: Locator;
  private btncheckAvilability: Locator;
  private inputPostcode: Locator;
  private selectMelbourne: Locator;
  private deliveryoption: Locator;
  private clickandCollect: Locator;
  private inStore: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator('span.Button_labelVariants_button__ickenod:has-text("Add to cart")');
    this.slidoutCartButton = page.getByTestId('slideout-close-button');
    this.thirdaddToCartButtonitem = page.locator('(//span[contains(@class, "Button_labelVariants_button__ickenod") and text()="Add to cart"])');
    this.cartButton = page.locator('//span[contains(@class, "_16cfbrb4") and text()="Cart"]');
    this.subtotalAmount = page.locator('cart-price-total');
    this.increaseQuantity = page.locator('button[value="Increase Value"]');
    this.viewCart = page.locator('text=View Cart');
    this.btncheckAvilability = page.locator('button:has-text("Check Availability")');
    this.inputPostcode = page.locator('[data-testid="jbtextfield-location-search"]');
    this.selectMelbourne = page.locator('text=Melbourne VIC 3004');
    this.deliveryoption = page.locator('div._1r37qq91:has-text("Delivery")');
    this.clickandCollect = page.locator('span._13cnlxs1xu:has-text("Click & Collect")');
    this.inStore = page.locator('text=In-store').first(); 

  }

  async addFirstItemToCart(): Promise<void> {
    try {
      await this.addToCartButton.first().click();
      await this.slidoutCartButton.click();
      console.log('First item added to cart successfully.');
    } catch (error) {
      console.error('Failed to add the first item to cart:', error);
      throw error;
    }
  }

  async addThirdItemToCart(): Promise<void> {
    try {
      await this.thirdaddToCartButtonitem.nth(2).waitFor({ state: 'visible', timeout: 60000 });
      await this.thirdaddToCartButtonitem.nth(2).dblclick();
      await this.slidoutCartButton.click();
      console.log('Third item added to cart successfully.');
    } catch (error) {
      console.error('Failed to add the third item to cart:', error);
      throw error;
    }
  }

  async addItemToCart(itemNumber: number): Promise<void> {
    try {
      for (let i = 0; i < itemNumber; i++) {
        await this.thirdaddToCartButtonitem.nth(i).dblclick();
        await this.slidoutCartButton.waitFor({ state: 'visible', timeout: 100000 });
        await this.slidoutCartButton.click();
      }
      console.log(`Added ${itemNumber} items to cart successfully.`);
    } catch (error) {
      console.error(`Failed to add ${itemNumber} items to cart:`, error);
      throw error;
    }
  }

  async goToCart(): Promise<void> {
    try {
      await this.cartButton.click();
      console.log('Navigated to the cart successfully.');
    } catch (error) {
      console.error('Failed to navigate to the cart:', error);
      throw error;
    }
  }

  async getSubtotal(): Promise<string> {
    try {
      const subtotal = await this.subtotalAmount.innerText();
      console.log('Subtotal amount:', subtotal);
      return subtotal;
    } catch (error) {
      console.error('Failed to get the subtotal amount:', error);
      throw error;
    }
  }

  async increaseQuantityOfItem(itemNumber: number): Promise<void> {
    try {
      await this.increaseQuantity.nth(itemNumber).click();
      console.log(`Increased quantity of item ${itemNumber} successfully.`);
    } catch (error) {
      console.error(`Failed to increase quantity of item ${itemNumber}:`, error);
      throw error;
    }
  }

  async clickOnViewCart(): Promise<void> {
    try {
      await this.viewCart.click();
      console.log('Clicked on "View Cart" successfully.');
    } catch (error) {
      console.error('Failed to click on "View Cart":', error);
      throw error;
    }
  }

  async checkAvailability(pincode: string): Promise<void> {
    try {
      await this.btncheckAvilability.click();
      await this.inputPostcode.click();
      await this.inputPostcode.fill(pincode);
      await this.selectMelbourne.click();
      console.log(`Checked availability for pincode ${pincode} successfully.`);
    } catch (error) {
      console.error(`Failed to check availability for pincode ${pincode}:`, error);
      throw error;
    }
  }

  async validateAvailabilityOptions(): Promise<void> {
    try {
      await this.deliveryoption.waitFor({ state: 'visible', timeout: 60000 });
      await this.clickandCollect.waitFor({ state: 'visible', timeout: 60000 });
      await expect(this.deliveryoption).toBeVisible();
      await expect(this.clickandCollect).toBeVisible();
      await expect(this.inStore).toBeVisible();
      console.log('All availability options are visible.');
    } catch (error) {
      console.error('Failed to validate availability options:', error);
      throw error;
    }
  }
}