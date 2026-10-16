# Playwright POM Sample — playwright.dev

Sample UI test suite for https://playwright.dev using Playwright Test + TypeScript and the Page Object Model.

## Structure

```
pages/        Page objects (BasePage, HomePage, DocsPage, SearchModal)
fixtures/     Custom test fixture that injects page objects into tests
tests/        Spec files
playwright.config.ts
```

- `pages/BasePage.ts` — abstract base with the shared navbar (logo, Docs, API, search, theme toggle) and `goto()` driven by each page's `path`.
- `pages/HomePage.ts`, `pages/DocsPage.ts` — extend `BasePage`.
- `pages/SearchModal.ts` — standalone component object for the Algolia DocSearch modal.
- `fixtures/pages.fixture.ts` — extends Playwright's `test` with `homePage`, `docsPage` and `searchModal` fixtures, and re-exports `expect`.

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

Run a single spec or project:

```bash
npx playwright test tests/home.spec.ts
npx playwright test --project=firefox
```

## Configuration

Defined in `playwright.config.ts`:

- `baseURL`: `https://playwright.dev`, so page objects use relative paths.
- Projects: `chromium`, `firefox`, `webkit`.
- Fully parallel locally; on CI (`CI` env var set): 1 worker, 2 retries, `test.only` forbidden.
- Reporters: HTML (not auto-opened) and list.
- Artifacts: trace on first retry, screenshot on failure, video retained on failure.

## Test coverage

| Spec | Covers |
| --- | --- |
| `tests/home.spec.ts` | Title, hero heading, navbar links, Get started → Installation, theme toggle |
| `tests/docs.spec.ts` | Installation heading and sidebar, sidebar navigation, next-page link, API link |
| `tests/search.spec.ts` | Search modal returns results for "locator" |
| `tests/cura-login.spec.ts` | CURA demo (katalon-demo-cura.herokuapp.com) Login page: form elements, valid login, login form hidden once signed in. Uses `CURA_USERNAME` / `CURA_PASSWORD` if set, else the demo account shown on the page |

## Adding tests

1. Page with the shared navbar: create a class in `pages/` that extends `BasePage` and sets `readonly path`. Standalone component: create a plain class like `SearchModal`.
2. Register it as a fixture in `fixtures/pages.fixture.ts`.
3. In specs, import `test` and `expect` from `../fixtures/pages.fixture` (not `@playwright/test`) and request page objects as fixtures.
4. Prefer role-based locators (`getByRole`) and keep locators inside page objects, not specs.
