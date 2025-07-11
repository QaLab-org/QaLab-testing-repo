import {Browser, Page} from '@playwright/test';
import {Before, After, setDefaultTimeout, Status} from "@cucumber/cucumber";
import {ChromiumContext} from '../containers/test_context';
import {LoginPage} from '../pages/login_page';
import {Container, ContainerKeys} from '../containers/container';
import config from "../../playwright.config";
import {createLogger} from "winston";
import {options} from "./logger";

const testContext = new ChromiumContext();
export const globalTimeout: number = config.expect?.timeout || 5000;
export const maxRetry = 3;
let browser: Browser;
let page: Page;

const fs = require('fs');



setDefaultTimeout(globalTimeout);

Before(async (scenario: any) => {


    browser = await testContext.browserLaunch();

    const scenarioName = scenario.pickle.name;
    const context = await browser.newContext({
        recordVideo: {
            dir: `artifacts/videos/${scenarioName}`
        }
    });

    page = await context.newPage();

    let loginPage: LoginPage = new LoginPage(page);

    await loginPage.login();



    const logger = createLogger(options(scenarioName));
    Container.register(ContainerKeys.logger, logger);
    Container.register(ContainerKeys.context, context);
    Container.register(ContainerKeys.page, page);

});

After(async function (scenario: any) {
    let img: any;

    if (scenario.result?.status == Status.FAILED) {
        img = await page.screenshot({path: `./screenshots/${scenario.pickle.name}.png`, type: "png"});
        await this.attach(img, "image/png");
        const videoPath = await page.video()?.path();
        if (videoPath) {
            await this.attach(fs.readFileSync(videoPath), 'video/webm');
        }
    }



    await testContext.close();
});
