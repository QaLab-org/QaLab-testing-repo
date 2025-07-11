# Test Project

**Test Project** is a specialized resource for software testers. Explore best practices, and project structures to enhance your skills. Access code samples, and gain valuable insights to improve your testing expertise.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Writing Features](#writing-features)
- [Step Definitions](#step-definitions)
- [Page Objects](#page-objects)
- [Running Tests](#running-tests)
- [Reporting](#reporting)
- [GitHub Action for E2E Tests](#github-action-for-e2e-tests)

## Project Structure

The project follows a Page Object Model (POM) pattern for organizing your Playwright and CucumberJS tests. Here's an overview of the project structure:




<pre style="background-color: #272822; border: 1px solid #3A3A3A; padding: 20px; border-radius: 5px;">
<code>
<span style="color: #66D9EF; font-weight: bold;">📂 .github</span>
│
├── <span style="color: #F92672; font-weight: bold;">📁 workflows</span>
│   │
│   └── <span style="color: #A6E22E; font-weight: bold;">📁 e2e.yml</span>
│
<span style="color: #66D9EF; font-weight: bold;">📂 e2e-tests</span>
│
├── <span style="color: #F92672; font-weight: bold;">📁 src</span>
│   │
│   ├── <span style="color: #A6E22E; font-weight: bold;">📁 containers</span>
│   │   ├── container.ts
│   │   └── test_context.ts
│   │
│   ├── <span style="color: #A6E22E; font-weight: bold;">📁 helper</span>
│   │   └── report.ts
│   │
│   ├── <span style="color: #A6E22E; font-weight: bold;">📁 hooks</span>
│   │   ├── hooks.ts
│   │   ├── logger.ts
│   │   └── pageFixture.ts
│   │
│   ├── <span style="color: #A6E22E; font-weight: bold;">📁 pages</span>
│   │   ├── base_page.ts
│   │   ├── cart_page.ts
│   │   └── login_page.ts
│   │
│   └── <span style="color: #A6E22E; font-weight: bold;">📁 test</span>
│       │
│       ├── <span style="color: #66D9EF; font-weight: bold;">📁 features</span>
│       │   ├── saucedemo.feature
│       │   └── transform-feature.js
│       │
│       └── <span style="color: #66D9EF; font-weight: bold;">📁 steps</span>
│           └── saucedemo.ts
│
├── <span style="color: #F92672; font-weight: bold;">📁 screenshots</span>
│   └── name of testcase.png
│
├── <span style="color: #F92672; font-weight: bold;">📁 test-results</span>
│   ├── cucumber-report.html
│   ├── cucumber-report.json
│   ├── cucumber-report.xml
│   └── testmo-report.xml
│
├── <span style="color: #F92672; font-weight: bold;">📁 videos</span>
│   └── <span style="color: #A6E22E; font-weight: bold;">📁 name of testcase</span>
│       └── 7afc88b4cea617651257de8ddba0409a.webm
│
├── <span style="color: #F92672; font-weight: bold;">📁 test-data</span>
│   └── example.png
├── package.json
├── package-lock.json
├── cucumber.json
├── playwright.config.js
├── tsconfig.json
├── .env
├── modify-xml-report.js
├── .gitignore
└── readme.md
</code>
</pre>



- **`.github`**: Typically contains configuration files for various aspects of the repository, including GitHub Actions workflows.
    - **`workflows`**: It is where you usually store your workflow configuration files.
        - **`e2e.yml`**: It is likely a specific workflow configuration written in YAML (YAML Ain't Markup Language). YAML is a human-readable data serialization format commonly used for configuration files..
           
- **`e2e-tests`**: The main directory for the end-to-end (e2e) tests.
    - **`src`**: The source code directory containing various subdirectories for the test code.
        - **`containers`**: This folder is like the toolbox for managing resources in your testing project. It contains two important parts:
            - **`container.ts`**: which acts as a registry for storing and accessing various dependencies or objects needed throughout the code. It allows for registering, resolving, and removing dependencies, making it easier to manage and share resources within the project.
            - **`test_context.ts`**: is a file that provides a context for working with Playwright, a tool for browser automation. It includes a class called `ChromiumContext` that handles browser and page management. It enables launching a browser, creating new pages, and closing resources efficiently. This context simplifies interactions with Playwright, ensuring that browser and page instances are properly managed during test execution.

        - **`helper`**: The helper directory that includes `report.ts`.

        - **`hooks`**: Contains hook-related code files, such as `hooks.ts`, `logger.ts`, and `pageFixture.ts`.

        - **`pages`**: The pages directory with classes to represent different web pages, including `base_page.ts` which is a module implementing a BasePage class for the Page Object Model (POM) pattern. It provides reusable methods for interacting with web pages and handling common tasks like clicking, filling, waiting, and making assertions..

        - **`test`**: The directory that holds the test-related code.

            - **`features`**: This directory contains Gherkin feature files, it also contains `transform-feature.js` which takes Gherkin feature file content, extracts the steps, and generates corresponding TypeScript step definitions for Cucumber. It automatically creates a .ts file with these steps in the 'steps' directory for test automation .

            - **`steps`**: Step definition files are placed in this directory.

- **`screenshots`**: The directory for storing screenshots related to the test cases, with filenames like `name of testcase.png`. The screenshots are taken only on test failure

- **`test-results`**: A directory for storing various test result files, including `cucumber-report.html`, `cucumber-report.json`, `cucumber-report.xml`, and `testmo-report.xml`.

- **`videos`**: This directory contains video recordings of the test executions.

    - **`name of testcase`**: A subdirectory that holds video files, such as `7afc88b4cea617651257de8ddba0409a.webm`.
- **`test-data`**: This directory houses various data resources, serving as valuable assets for use within the code.

- **`package.json`**: The project's Node.js package configuration file, specifying dependencies and scripts.

- **`package-lock.json`**: A lock file for Node.js packages, specifying exact versions of dependencies.

- **`cucumber.json`**: Configuration file for CucumberJS settings.

- **`playwright.config.js`**: Playwright configuration file used to set up browsers and other Playwright settings.

- **`tsconfig.json`**: TypeScript configuration file for the project.

- **`.env`**: Configuration file for environment variables, it's mainly used to set up the base url to run the tests locally.

- **`modify-xml-report.js`**: A script file that takes a Cucumber test report in XML format and processes it to generate a modified version, testmo-report.xml, which includes additional properties tags for use in TestMo. It adds relevant information such as step status, author, and attachment links for failed test cases, making it suitable for TestMo test reporting.

- **`.gitignore`**: Configuration file for Git to specify which files and directories to ignore.

- **`readme.md`**: The README file containing documentation or information about the project.


## Installation

To set up the project and install its dependencies, follow these steps:

1. Make sure you have Node.js installed on your system.

2. Clone the repository to your local machine or download the source code.

3. Open a terminal/command prompt and navigate to the project's root directory.

4. Run the following command to install the project's dependencies using npm:

```bash
npm install
```
This command will install the required packages listed in the package.json file.


## Writing Features

After a manual tester creates a test case in Testmo, the test script creator can translate that test case into a Gherkin language script to be executed as definition steps. The process involves converting the manual test case into a Gherkin feature file, which serves as a set of instructions for automated testing. The following are the steps to create Gherkin features from Testmo test cases:

1. **Manual Test Case**: Begin with the manual test case created in Testmo. This test case outlines the steps and expected outcomes for a specific scenario.

2. **Convert to Gherkin**: Translate the manual test case into Gherkin language, which is a plain-text language with specific syntax for defining tests. It includes keywords like `Given`, `When`, `Then`, and `And`. Use these keywords to describe the steps and expected results in a structured manner.

3. **Feature File**: Generate a new Gherkin feature file with a `.feature` extension. This file will contain the Gherkin script for your test case. Ensure it includes a clear title and description of the feature at the beginning of the file.

4. **Scenarios**: More or more scenarios are defined within the feature file, each representing a specific test case. Utilize Gherkin keywords to define the steps for each scenario. For example:

   ```gherkin
   Feature: Login Functionality

   Scenario: Valid Login
     Given the user is on the login page
     When the user enters valid credentials
     And clicks the login button
     Then the user should be logged in successfully
	```

## Step Definitions

Once the manual test cases are translated from Testmo into Gherkin language scripts and created Gherkin feature files, the next step is to implement step definitions in TypeScript. These step definitions will serve as the bridge between the Gherkin script and the automation logic. Here's how to write and organize the step definitions:

1. **Create Step Definitions**: These step definitions are typically located in the `src/test/steps` directory.

2. **Map Gherkin Steps**: Each step defined in the Gherkin scenarios should have a corresponding step definition. For example, a Gherkin step like:

```gherkin
Given The user is on the login page
```
should be mapped to a step definition in TypeScript like:

```typescript
Given('The user is on the login page', async () => {
// Automation logic to navigate to the login page
});
```

## Page Objects

Incorporating the Page Object Model (POM) in our testing strategy helps us keep our code clean and organized. It separates the code for interacting with web pages from our test scripts, making our automation more efficient and maintainable.


## Running Tests

To run the tests and generate reports, you can use the following npm scripts defined in the package.json file:

To run the tests:

```bash
npm test
```

## Reporting

* Reporting options are configured in the cucumber.json file.
* You generate three files: **`cucumber-report.html`**, **`cucumber-report.json`**, and **`cucumber-report.xml`**.
* The **`modify-xml-report.js`** script is used to create **`testmo-report.xml`**, which includes additional properties for use in TestMo.
* These properties may include step status, author information, and attachment links for failed test cases. Here is an example:

```xml
<properties>
    <property name="step[passed]" value="I am on the Inventory Page."/>
    <property name="step[passed]" value="I add Sauce Labs Backpack to the cart."/>
    <property name="step[failure]" value="I proceed to checkout."/>
    <property name="step[skipped]" value="I should be on the checkout page."/>
    <property name="Screenshot" value="https://github.com/instadeepai/tesmotest/blob/gh-pages/e2e-tests/screenshots/Checkout%20the%20items%20in%20the%20cart.png"/>
    <property name="Event" value="push"/>
    <property name="Author" value="khlifi-instadeep"/>
</properties>
```
The provided XML code will result in the following output in Testmo:

![](./test-data/testmo-fields.png)
![](./test-data/testmo-steps.png)

## GitHub Action for E2E Tests

#### Workflow Name: e2e-test-feature

This GitHub Action workflow (`e2e-test-feature`) is designed to run end-to-end (E2E) tests for your project. It is triggered on various events such as code pushes, pull requests, and scheduled cron jobs. The workflow includes the following steps:

1. **Print Current Date and Time**: Displays the current date and time at the beginning of the workflow.

2. **Checkout Repository**: Checks out the repository to the GitHub Actions runner.

3. **Set up Node.js**: Sets up the Node.js environment with version 18.15.0.

4. **Install Dependencies**: Installs the project dependencies using npm.

5. **Set Environment Variables and Display WEB_URL**: Sets up environment variables for the workflow, including the release name and web URL.

6. **Install TestMo CLI**: Installs the TestMo CLI for working with TestMo resources.

7. **Add TestMo Resources**: Adds TestMo resources such as git field and build link.

8. **Create TestMo Run**: Creates a TestMo run and sets the TESTMO_RUN_ID output variable.

9. **Run Tests**: Installs Playwright and runs the E2E tests. If the tests fail, sets the TEST_FAILED environment variable.

10. **Debugging Step**: Prints the TEST_FAILED environment variable for debugging purposes.

11. **Modify XML Report**: Modifies the XML report using the `modify-xml-report.js` script.

12. **Submit TestMo Results**: Submits the TestMo results using the generated XML report.

13. **Complete TestMo Run**: Marks the TestMo run as complete.

14. **Fail on Test Failure**: Exits with an error if TEST_FAILED is true.

15. **Send Slack Notification**: Sends a Slack notification with the status of the job.

16. **Copy Screenshots for GitHub Pages**: Copies screenshots to the `gh-pages` directory.

17. **Publish Screenshots to GitHub Pages**: Publishes screenshots to the `gh-pages` branch.

18. **Archive Artifacts**: Archives artifacts, including XML reports and screenshots.

19. **Publish Test Report**: Publishes the JUnit test report using the `action-junit-report` action.

This GitHub Action ensures that your E2E tests are executed, TestMo results are submitted, and relevant artifacts are published.

---

**Note:** Make sure to customize the workflow according to your project's specific requirements.
