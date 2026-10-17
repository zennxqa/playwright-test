import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/cart/HomePage';
import { ProductFlyingNinjaPage } from '../../pages/cart/ProductFlyingNinjaPage';
import { CartPage } from '../../pages/cart/CartPage';

/**
 * Shopper can add a product to the cart and update its quantity
 *
 * Recorded in the Zennx Playwright studio; 5 assertions designed by Zennx AI
 * from what each page showed. Review that they are the checks that
 * would actually catch this flow breaking.
 *
 * Crosses 3 pages: HomePage → ProductFlyingNinjaPage → CartPage.
 *
 * Designed with Zennx AI from a recording: Shopper can add a product to the cart and update its quantity.
 * Review: Step 3 uses a weak positional CSS locator (ul > li:nth-of-type(1) > div > a:nth-of-type(1) > img, low confidence). Replace it with getByRole('link', { name: /Flying Ninja/ }) or similar. As it stands, the step depends on product order.
 * Review: Step 7 (clicking the quantity field after filling it) looks accidental and can be dropped.
 * Review: Step 2 clicks 'Shop' while already on the shop home page. The URL and content did not change, so the step is redundant.
 * Review: The snapshots never show the cart quantity or totals after 'Update cart', so nothing recorded proves the update worked. Add an assertion that the quantity input has value 2, or check the updated subtotal or the 'Cart updated' notice.
 */
test('Shopper can add a product to the cart and update its quantity', async ({ page }) => {
    const home = new HomePage(page);
    const productFlyingNinja = new ProductFlyingNinjaPage(page);
    const cart = new CartPage(page);

    await home.goto();
    await home.clickShopLink();
    await home.clickImg();

    // Flying Ninja – Katalon Shop
    await productFlyingNinja.expectFlyingNinjaHeadingVisible();
    await expect(page).toHaveURL(/\/product\/flying-ninja\//);
    await productFlyingNinja.clickAddToCartButton();
    await productFlyingNinja.expectViewCartFlyingNinjaHasBeenAddedToYourCartText('has been added to your cart.');
    await productFlyingNinja.clickViewCartLink();

    // Cart – Katalon Shop
    await cart.expectCartTotalsHeadingVisible();
    await expect(page).toHaveURL(/\/cart\//);
    await cart.fillFlyingNinjaQuantity('2');
    await cart.clickFlyingNinjaQuantity();
    await cart.clickUpdateCartButton();
});
