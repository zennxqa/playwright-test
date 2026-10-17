import { test, expect } from '@playwright/test';
import { DemoEcommersePage } from '../../pages/sign-up/DemoEcommersePage';
import { DemoEcommerseSignupPage } from '../../pages/sign-up/DemoEcommerseSignupPage';

/**
 * Visitor can create a new account from the shop
 *
 * Recorded in the Zennx Playwright studio; 5 assertions designed by Zennx AI
 * from what each page showed. Review that they are the checks that
 * would actually catch this flow breaking.
 *
 * Crosses 2 pages: DemoEcommersePage → DemoEcommerseSignupPage.
 *
 * Secrets are read from the environment, never written here: SIGNUP_PASSWORD, SIGNUP_PASSWORD_2.
 * Set them in .env locally, and as variables of the pipeline or its environment.
 *
 * Designed with Zennx AI from a recording: Visitor can create a new account from the shop.
 * Review: The email testdemo2@test.com is hard-coded. A second run will probably fail as a duplicate account, so generate a unique email per run (e.g. add a timestamp) or clean up the account afterwards.
 * Review: The welcome text contains the first name ('Welcome, Test!'). The assertion checks only 'Your account is ready.' so it keeps passing if the test name changes.
 * Review: Step 7's snapshot only shows the same 'Create your account' heading again, so it does not prove anything new.
 * Review: No console errors or failed requests were reported. All locators are data-testid with high confidence.
 */
test('Visitor can create a new account from the shop', async ({ page }) => {
    const demoEcommerse = new DemoEcommersePage(page);
    const demoEcommerseSignup = new DemoEcommerseSignupPage(page);

    await demoEcommerse.goto();
    await demoEcommerse.clickNavSignup();
    await demoEcommerse.expectShopTheQaCollectionHeadingVisible();
    await expect(page).toHaveURL('https://zennx.dev/demo-ecommerse');
    await demoEcommerse.expectWelcomeTestYourAccountIsReadyText('Your account is ready.');

    // Sign up · Zennx Demo Store
    await demoEcommerseSignup.expectCreateYourAccountHeadingVisible();
    await expect(page).toHaveURL(/\/demo-ecommerse\/signup/);
    await demoEcommerseSignup.fillInputName('Test Demo2');
    await demoEcommerseSignup.fillInputEmail('testdemo2@test.com');
    await demoEcommerseSignup.fillInputPassword(process.env.SIGNUP_PASSWORD ?? '');
    await demoEcommerseSignup.fillInputConfirm(process.env.SIGNUP_PASSWORD_2 ?? '');
    await demoEcommerseSignup.setInputTerms(true);
    await demoEcommerseSignup.clickSignupSubmit();
});
