<!-- .github/copilot-instructions.md -->
# AI Assistant Guide — ui-automation

Purpose: Help an AI coding assistant become productive quickly in this Playwright-based UI test repo.

- **Big picture**: This repository contains Playwright UI tests using a simple Page Object Model. Tests live in `TestCases/` and page objects live in `Pages/`. The test runner is Playwright Test configured in `playwright.config.ts`.

- **Key files**:
  - [package.json](package.json): project metadata and devDependencies (`@playwright/test`, `playwright`).
  - [playwright.config.ts](playwright.config.ts): baseURL, `testDir` (currently an absolute path), reporter, and `use` defaults (trace, screenshots).
  - [Pages/HomePage.ts](Pages/HomePage.ts) and [Pages/ProductPage.ts](Pages/ProductPage.ts): canonical Page Object examples — constructors take a `Page`, locators are declared at top, methods perform actions and rethrow on error.
  - [TestCases/testCase1.spec.ts](TestCases/testCase1.spec.ts): example flow — manual browser launch + Page Objects usage.

- **Architecture / flow**:
  - Tests instantiate page objects (`new HomePage(page)`, `new ProductPage(page)`), call methods to navigate, search, filter, add items, and assert values.
  - Page Objects encapsulate selectors and operations: they use Playwright `Locator`, `page.locator(...)`, `.first()`, `.nth()`, `.dblclick()` and `getByTestId()` patterns.
  - The test runner configuration sets global `baseURL` and common `use` options; some tests still manually launch `chromium` (see testCase1.spec.ts).

- **Project-specific conventions & patterns**:
  - Page classes: PascalCase filename and exported class (e.g., `Pages/ProductPage.ts` → `ProductPage`).
  - Locator fields are declared in the constructor and reused in methods.
  - Methods wrap actions in try/catch, `console.error` on failure, then `throw` to fail the test — rely on this pattern when updating methods.
  - Tests live in `TestCases/` and use Playwright `test()` blocks; filenames end with `.spec.ts`.
  - Screenshots: tests call `page.screenshot({ path: '...', fullPage: true })` and failing screenshots are configured via the Playwright config (only-on-failure).

- **Notable implementation details worth attention**:
  - `playwright.config.ts` uses an absolute `testDir: 'D:/ui-automation/TestCases'`. This prevents running tests from other machines unless updated — prefer relative paths if changing config.
  - `package.json` currently has no test script; CI or contributors usually run Playwright directly via `npx playwright test`.
  - `ProductPage.subtotalAmount` locator is declared as `page.locator('cart-price-total')` (no obvious selector syntax). When editing or debugging, verify this locator returns an element.
  - Tests sometimes launch `chromium.launch()` manually (creates a separate browser instance) instead of using Playwright Test fixtures. Be mindful when converting tests to use fixtures.

- **How to run locally (commands)**:
  - Install deps (Windows):
    ```bash
    npm ci
    npx playwright install
    ```
  - Run the whole test suite:
    ```bash
    npx playwright test
    ```
  - Run a single test file:
    ```bash
    npx playwright test TestCases/testCase1.spec.ts
    ```
  - Generate/inspect HTML report (default reporter is configured): open `playwright-report/index.html` after a run.

- **When modifying code**:
  - Keep the Page Object pattern: add locators to the constructor and expose actions as async methods that throw on failure.
  - If adding scripts, update `package.json` `scripts` to include a `test` or `test:playwright` entry to make local runs consistent.
  - If changing `playwright.config.ts`, prefer relative `testDir` and document required environment variables or credentials if added.

- **Examples to reference**:
  - `HomePage.searchForProduct('TV')` → shows how search input and button flows are implemented.
  - `ProductPage.addFirstItemToCart()` → uses `.first().click()` and interacts with a slideout cart close button.

If anything here is unclear or you want more detail (CI integration, relative `testDir` change, converting tests to fixtures, or adding npm scripts), tell me which area to expand or update. 
