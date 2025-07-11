import {expect, Page} from '@playwright/test';
import {BasePage} from './base_page';

/****Define Selectors****/

const selectors = {
    inputSelector: '//button[@data-test="input"]',
    buttonSelector: '//button[@data-test="button"]',
    usernameInput: '//input[@data-test="username"]',
    addToCartSauceLabsBackpack: '//button[@data-test="add-to-cart-sauce-labs-backpack"]',
    removeFromCartSauceLabsBackpack: '//button[@data-test="remove-sauce-labs-backpack"]',
    shoppingCartLink: '//a[@class="shopping_cart_link"]',
    inventoryItemName: '//div[@class="inventory_item_name"]',
    checkoutButton: '//button[@data-test="checkout"]'

}


export class CartPage extends BasePage {

    /****Constructor****/
    constructor(page: Page) {
        super(page);
    }

    /****Define Methods****/


    async verifyNavigatedToInventoryPage(): Promise<void> {
        const currentURL: string = this.page.url();
        await expect(currentURL).toContain(this.baseURL + '/inventory.html');
    }

    async addSauceLabsBackpackToCart(): Promise<void> {
		await this.click(selectors.addToCartSauceLabsBackpack);
    }

    async verifyItemInCart(valueString1: string): Promise<void> {
		await this.click(selectors.shoppingCartLink);
        const currentURL: string = this.page.url();
        await expect(currentURL).toContain(this.baseURL + '/cart.html');
        const inventoryName: string = await this.page.locator(selectors.inventoryItemName).innerText();
        await expect(inventoryName).toEqual(valueString1);
    }

    async goToCheckoutPage(): Promise<void> {
        if (await this.page.locator(selectors.addToCartSauceLabsBackpack).isVisible()) {
            await this.click(selectors.addToCartSauceLabsBackpack);
        }
        else
        {
            await this.click(selectors.removeFromCartSauceLabsBackpack);
            await this.click(selectors.addToCartSauceLabsBackpack);
        }
        await this.click(selectors.shoppingCartLink);
        await this.click(selectors.checkoutButton);
    }

    async verifyNavigatedToCheckoutPage(): Promise<void> {
        const currentURL: string = this.page.url();
        await expect(currentURL).toContain(this.baseURL + '/checkout-step-one.html');
    }
}

