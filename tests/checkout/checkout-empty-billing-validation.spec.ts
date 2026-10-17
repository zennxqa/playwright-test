import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/checkout/HomePage';
import { ProductHappyNinja2Page } from '../../pages/checkout/ProductHappyNinja2Page';
import { CartPage } from '../../pages/checkout/CartPage';
import { CheckoutPage } from '../../pages/checkout/CheckoutPage';

/**
 * Checkout blocks an order when billing details are empty
 *
 * Recorded in the Zennx Playwright studio; 6 assertions designed by Zennx AI
 * from what each page showed. Review that they are the checks that
 * would actually catch this flow breaking.
 *
 * Crosses 4 pages: HomePage → ProductHappyNinja2Page → CartPage → CheckoutPage.
 *
 * Designed with Zennx AI from a recording: Checkout blocks an order when billing details are empty.
 * Review: Step 2 uses a weak, position-based CSS locator (ul > li:nth-of-type(2) ... img, low confidence). It will break if the product order changes. Use getByRole('link', { name: 'Happy Ninja' }) or the product heading instead.
 * Review: Step 6 (clicking the quantity field after filling it) looks accidental and can be dropped.
 * Review: The cart snapshots after steps 5–7 do not show the updated quantity or total, so the recording cannot prove the quantity change to 3 worked. Add a check on the quantity input value or the cart total.
 * Review: A 'Please fill out this field.' validation message was already on the product page before anything was entered (S2.1). It probably comes from the review form, but it is worth checking.
 */
test('Checkout blocks an order when billing details are empty', async ({ page }) => {
    const home = new HomePage(page);
    const productHappyNinja2 = new ProductHappyNinja2Page(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await home.goto();
    await home.clickImg();

    // Happy Ninja – Katalon Shop
    await expect(page).toHaveURL(/\/product\/happy-ninja-2\//);
    await productHappyNinja2.clickAddToCartButton();
    await productHappyNinja2.expectViewCartHappyNinjaHasBeenAddedToYourCartText('has been added to your cart.');
    await productHappyNinja2.clickViewCartLink();

    // Cart – Katalon Shop
    await expect(page).toHaveURL(/\/cart\//);
    await cart.fillHappyNinjaQuantity('3');
    await cart.clickHappyNinjaQuantity();
    await cart.clickUpdateCartButton();
    await cart.clickProceedToCheckoutLink();

    // Checkout – Katalon Shop
    await checkout.expectCheckoutHeadingVisible();
    await checkout.clickPlaceOrderButton();
    await expect(page).toHaveURL(/\/checkout\//);
    await checkout.expectBillingFirstNameIsARequiredFieldBillingLastNameIsText('Billing First name is a required field.');
});
