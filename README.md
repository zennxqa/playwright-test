# Playwright POM Sample — playwright.dev

Sample UI test suite for https://playwright.dev using Playwright Test + TypeScript and the Page Object Model.

## Structure

```
pages/        Page objects (BasePage, HomePage, DocsPage, SearchModal)
fixtures/     Custom test fixture that injects page objects into tests
tests/        Spec files
playwright.config.ts
```

## Run

```bash
npm install
npx playwright install
npm test                # all browsers
npm run test:chromium   # Chromium only
npm run test:headed     # watch the browser
npm run test:ui         # Playwright UI mode
npm run report          # open the HTML report
npm run typecheck
```
