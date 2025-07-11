import {expect, Locator, Page} from "@playwright/test";
import config from "../../playwright.config";


export class BasePage {

    protected page: Page;
    public baseURL: string;
    protected baseApiURL: string;
    protected timeout: number;


    constructor(page: Page) {
        this.page = page;
        this.baseURL = config.use?.baseURL || 'http://127.0.0.1:3000';
        this.timeout = config.expect?.timeout || 0;
        this.baseApiURL = `${this.baseURL.replace('https://', 'https://api.')}`;
    }


    async goTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async WaitForRedirection(url: string): Promise<void> {
        await this.page.waitForURL(url);
        await expect(this.page).toHaveURL(url);
    }

    async checkRedirectToGenePage(): Promise<void> {
        const currentURL: string = this.page.url();
        await expect(currentURL).toContain(this.baseURL);
    }

    async getNumberOfSelectorElements(elementSelector: string): Promise<number> {
        return await this.page.locator(elementSelector).count();
    }

    async toHaveValue(elementSelector: string, value: number): Promise<void> {
        const element: Locator = this.page.locator(elementSelector).first();
        const elementInnerText: string = await element.textContent() ?? '';
        await expect(parseInt(elementInnerText)).toEqual(value);
    }

    async toHaveText(elementSelector: string, value: string): Promise<void> {
        const element: Locator = this.page.locator(elementSelector).first();
        const elementInnerText: string = await element.textContent() ?? '';
        await expect(elementInnerText).toEqual(value);
    }

    async click(elementSelector: string): Promise<void> {
        await this.waitForSelectorToBeVisible(elementSelector);
        await this.page.click(elementSelector);
    }

    async fill(elementSelector: string, value: string): Promise<void> {
        await this.waitForSelectorToBeVisible(elementSelector);
        await this.page.fill(elementSelector, value);

    }

    async waitForSelectorToBeVisible(elementSelector: string): Promise<void> {
        await expect(this.page.locator(elementSelector)).toBeVisible({timeout: this.timeout * 4});
    }

    async waitForSelectorNotToBeVisible(elementSelector: string): Promise<void> {
        await expect(this.page.locator(elementSelector)).not.toBeVisible({timeout: this.timeout});
    }

    async waitForSelectorToBeHidden(elementSelector: string): Promise<void> {
        await this.page.waitForSelector(elementSelector, {state: 'hidden'});
        await expect(this.page.locator(elementSelector)).toBeHidden();
    }

    async waitForResponse(url: string): Promise<void> {
        const response = await this.page.waitForResponse(url);
    }

    async checkCheckboxStatus(status: boolean, checkbox: Locator): Promise<void> {
        if (status) {
            await expect(checkbox).toBeChecked({timeout: this.timeout});
        } else {
            await expect(checkbox).not.toBeChecked({timeout: this.timeout});
        }
    }

    async retryUntilExpectationPasses(expectation: () => Promise<void>, maxAttempts: number, delayMs: number): Promise<void> {
        let attempts: number = 0;
        let error: Error | undefined;
        while (attempts < maxAttempts) {
            try {
                await expectation();
                return; // Expectation passed, exit the loop
            } catch (e) {
                error = e as Error;

            }
            await new Promise((resolve) => setTimeout(resolve, delayMs)); // Wait for the specified delay
            attempts++;
        }
        throw error; // Expectation failed even after retries, throw the last error
    }
}


