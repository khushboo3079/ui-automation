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
        this.cartItems = page.locator('.cart-item');
    }

    async clickOnCheckout(): Promise<void> {
        await this.btnCheckout.click();
    }

    async enterEmail(email: string): Promise<void> {
        await this.inputEmail.fill(email);
        await this.clickandCollect.click();
    }

    async validateProductandSubtotal() {
        try {
            await this.cartItems.first().waitFor({ state: 'visible', timeout: 5000 });
            const itemCount = await this.cartItems.count();
            expect(itemCount, `Expected 2 cart items but found ${itemCount}`).toBe(2);
            console.log('Validated cart items during checkout.');
        } catch (error) {
            console.error('Error validating cart items:', error);
            await this.page.screenshot({ path: 'screenshots/cart-validation-failure.png' });
            throw error;
        }
    }
}