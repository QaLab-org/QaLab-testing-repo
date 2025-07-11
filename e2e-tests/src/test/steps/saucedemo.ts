import {When, Then, Given} from "@cucumber/cucumber";
import {CartPage} from "../../pages/cart_page";
import {Container, ContainerKeys} from "../../containers/container";

let cartPage!: CartPage;
Given("I am on the Inventory Page", async (): Promise<void> => {
    cartPage = new CartPage(Container.resolve(ContainerKeys.page));
    await cartPage.verifyNavigatedToInventoryPage();
});

When("I add Sauce Labs Backpack to the cart", async (): Promise<void> => {
    await cartPage.addSauceLabsBackpackToCart();
});

Then("The item {string} should be in the cart", async (valueString1: string): Promise<void> => {
    await cartPage.verifyItemInCart('Sauce Labs Backpack');
});

When("I proceed to checkout", async (): Promise<void> => {
    await cartPage.goToCheckoutPage();
});

Then("I should be on the checkout page", async (): Promise<void> => {
    await cartPage.verifyNavigatedToCheckoutPage();
});
