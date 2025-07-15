import {When, Then, Given} from "@cucumber/cucumber";
import {CartPage} from "../../pages/cart_page";
import {Container, ContainerKeys} from "../../containers/container";

let cartPage!: CartPage;
Given("I am on the Inventory Page", async (): Promise<void> => {
    cartPage = new CartPage(Container.resolve(ContainerKeys.page));
    await cartPage.verifyNavigatedToInventoryPage();
});

When("I add {string} to the cart", async (productName:string): Promise<void> => {
    await cartPage.addProductToCart(productName);
});

Then("The item {string} should be in the cart", async (productName: string): Promise<void> => {
    await cartPage.verifyProductInCart(productName);
});

When("I proceed to checkout", async (): Promise<void> => {
    await cartPage.goToCheckoutPage();
});

Then("I should be on the checkout page", async (): Promise<void> => {
    await cartPage.verifyNavigatedToCheckoutPage();
});
