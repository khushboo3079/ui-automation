import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    private page: Page;
    private btnCheckout: Locator;
    private inputEmail: Locator;
    private clickandCollect: Locator;
    private cartItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnCheckout = page.locator('button:has-text("Checkout")');
        this.inputEmail = page.locator('//input[@id="email"]');
        this.clickandCollect = page.locator('text=Click & Collect');
        this.cartItems = page.locator('span._19gi7yt0._19gi7ytw._19gi7ytv._1fragemnw:has-text("Subtotal • 3 items")');
    }

    async clickOnCheckout(): Promise<void> {
        await this.btnCheckout.click();
    }

    async enterEmail(email: string): Promise<void> {
        await this.inputEmail.waitFor({state: 'visible', timeout:100000});
        await this.inputEmail.fill(email);
        await this.clickandCollect.click();
    }

    async validateProductandSubtotal() {
        const maxRetries = 3;
        let retries = 0;
    
        while (retries < maxRetries) {
            try {
                console.log(`Attempt ${retries + 1}: Waiting for cart items to be visible...`);
                await this.cartItems.waitFor({ state: 'visible', timeout: 10000 }); // Shorter timeout per attempt
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