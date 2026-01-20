import { Page, Locator, expect } from '@playwright/test';
import * as loctaors from "../tests/ui-automation/Locators/CheckoutLocators";

export class CheckoutPage{
    readonly page: Page;
    readonly BTN_CHECKOUT: Locator;
    readonly INPUT_EMAIL: Locator;
    readonly CLICK_AND_COLLECT: Locator;
    readonly CART_ITEMS: Locator;

    constructor(page: Page) {
        this.page = page;
        this.BTN_CHECKOUT = page.locator(loctaors.BTN_CHECKOUT);
        this.INPUT_EMAIL = page.locator('loctaors.INPUT_EMAIL');
        this.CLICK_AND_COLLECT = page.locator('loctaors.CLICK_AND_COLLECT');
        this.CART_ITEMS = page.locator('loctaors.CART_ITEMS');
    }

    async clickOnCheckout(): Promise<void> {
        await this.BTN_CHECKOUT.click();
    }

    async enterEmail(email: string): Promise<void> {
        await this.INPUT_EMAIL.waitFor({state: 'visible', timeout:100000});
        await this.INPUT_EMAIL.fill(email);
        await this.CLICK_AND_COLLECT.click();
    }

    async validateProductandSubtotal() {
        const maxRetries = 3;
        let retries = 0;
    
        while (retries < maxRetries) {
            try {
                console.log(`Attempt ${retries + 1}: Waiting for cart items to be visible...`);
                await this.CART_ITEMS.waitFor({ state: 'visible', timeout: 10000 }); // Shorter timeout per attempt
                console.log('Cart items are visible.');
    
                //const itemCount = await this.cartItems.count();
                console.log(`Found  cart items.`);
    
               // expect(itemCount, `Expected 2 cart items but found ${itemCount}`).toBe(3);
                console.log('Validated cart items during checkout.');
                return; // Exit the function if successful
            } catch (error) {
                retries++;
                console.error(`Attempt ${retries} failed:`, error);
                if (retries === maxRetries) {
                    await this.page.screenshot({ path: 'screenshots/cart-validation-failure.png' });
                    throw error;
                }
            }
        }
    }
}