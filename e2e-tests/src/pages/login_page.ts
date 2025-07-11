import {Page} from '@playwright/test';
import {BasePage} from './base_page';

/****Define Selectors****/

const selectors = {
    inputSelector: '//button[@data-test="input"]',
    buttonSelector: '//button[@data-test="button"]',
    usernameInput: '//input[@data-test="username"]',
    passwordInput: '//input[@data-test="password"]',
    loginButton: '//input[@data-test="login-button"]'

}


export class LoginPage extends BasePage {

    /****Constructor****/
    constructor(page: Page) {
        super(page);
    }

    /****Define Methods****/
    async enterUsername(username: string): Promise<void> {
        await this.fill(selectors.usernameInput, username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.fill(selectors.passwordInput, password);
    }

    async clickLoginButton(): Promise<void> {
        await this.click(selectors.loginButton);
    }

    /****Call methods defined above****/

    async login(): Promise<void> {
        await this.goTo(this.baseURL);
        await this.enterUsername('standard_user');
        await this.enterPassword('secret_sauce');
        await this.clickLoginButton();

    }

}

