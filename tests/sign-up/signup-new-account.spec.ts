import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
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
 * Review: The welcome text contains the first name ('Welcome, Test!'). The assertion checks only 'Your account is ready.' so it keeps passing if the test name changes.
 * Review: Step 7's snapshot only shows the same 'Create your account' heading again, so it does not prove anything new.
 * Review: No console errors or failed requests were reported. All locators are data-testid with high confidence.
 */
test('Visitor can create a new account from the shop', async ({ page }) => {
    const demoEcommerse = new DemoEcommersePage(page);
    const demoEcommerseSignup = new DemoEcommerseSignupPage(page);

    // Fake demo-store password from fixtures/signup-data.json; environment variables override it.
    const signupData: { SIGNUP_PASSWORD?: string; SIGNUP_PASSWORD_2?: string } = JSON.parse(
        readFileSync(path.resolve(__dirname, '../../fixtures/signup-data.json'), 'utf-8'),
    );
    const password = process.env.SIGNUP_PASSWORD || signupData.SIGNUP_PASSWORD;
    const confirmPassword = process.env.SIGNUP_PASSWORD_2 || signupData.SIGNUP_PASSWORD_2;
    if (!password || !confirmPassword) {
        throw new Error('Set SIGNUP_PASSWORD and SIGNUP_PASSWORD_2 in fixtures/signup-data.json, .env or the pipeline variables.');
    }
    // Unique per run so a second run is not rejected as a duplicate account.
    const email = `testdemo2+${Date.now()}@test.com`;

    // Shop · Zennx Demo Store
    await demoEcommerse.goto();
    await demoEcommerse.expectShopTheQaCollectionHeadingVisible();
    await demoEcommerse.clickNavSignup();

    // Sign up · Zennx Demo Store
    await expect(page).toHaveURL(/\/demo-ecommerse\/signup/);
    await demoEcommerseSignup.expectCreateYourAccountHeadingVisible();
    await demoEcommerseSignup.fillInputName('Test Demo2');
    await demoEcommerseSignup.fillInputEmail(email);
    await demoEcommerseSignup.fillInputPassword(password);
    await demoEcommerseSignup.fillInputConfirm(confirmPassword);
    await demoEcommerseSignup.setInputTerms(true);
    await demoEcommerseSignup.clickSignupSubmit();

    // Back in the shop, signed in
    await expect(page).toHaveURL(/^https:\/\/zennx\.dev\/demo-ecommerse\/?$/);
    await demoEcommerse.expectShopTheQaCollectionHeadingVisible();
    await demoEcommerse.expectWelcomeTestYourAccountIsReadyText('Your account is ready.');
});
