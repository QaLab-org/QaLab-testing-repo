import {Browser, Page, chromium} from '@playwright/test';
import config from '../../playwright.config';
import {Container, ContainerKeys} from './container';

const isCI = process.env.CI === 'true'; // Check if running on CI
interface TestContext {


    browserLaunch(): Promise<Browser>;
    newPage(browser: Browser): Promise<Page>;
    close(): Promise<void>;

}

export class ChromiumContext implements TestContext {
    async browserLaunch(): Promise<Browser> {

        let browser = await chromium.launch({headless: isCI});
        Container.register('browser', browser);

        return browser;

    }

    async newPage(browser: Browser): Promise<Page> {
        let page = await browser.newPage();
        Container.register(ContainerKeys.page, page);
        return page;
    }

    async close(): Promise<void> {
        try {
            if (Container.isRegistered(ContainerKeys.page)) {
                let page: Page = Container.resolve(ContainerKeys.page);
                if (page) {
                    await page.close();
                }
            }

            if (Container.isRegistered(ContainerKeys.browser)) {
                let browser: Browser = Container.resolve(ContainerKeys.browser);
                if (browser) {
                    await browser.close();
                }
            }
        } catch (error) {
            console.error('Error during close:', error);
        }
    }

}
