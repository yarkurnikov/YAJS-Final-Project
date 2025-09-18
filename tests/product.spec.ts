import { expect } from '@playwright/test';
import { test } from '../fixtures/myFixtures';

test('​Verify user can view product details', { tag: ['@smoke'] }, async ({ allPages, page }) => {
  const productName = 'Combination Pliers';

  await test.step('Navigate to home page', async () => {
    await page.goto('');
  });

  await test.step('Select product from home page', async () => {
    await allPages.homePage.clickOnItemCardByName(productName);
  });

  await test.step('Verify product page is loaded', async () => {
    await expect(page).toHaveURL(/.*\/product\/.*/);
  });

  await test.step('Verify product details are displayed', async () => {
    await expect(allPages.productPage.productTitle).toContainText(productName);
    await expect(allPages.productPage.productPrice).toContainText('14.15');
    await expect(allPages.productPage.addToCartButton).toBeVisible();
    await expect(allPages.productPage.addToFavoriteButton).toBeVisible();
  });
});


test('Verify user can add product to cart', { tag: ['@smoke'] }, async ({ allPages, page }) => {
  const productName = 'Slip Joint Pliers';

  await test.step('Navigate to home page', async () => {
    await page.goto('');
  });

  await test.step('Select product from home page', async () => {
    await allPages.homePage.clickOnItemCardByName(productName);
  });

  await test.step('Verify product page is loaded with correct details', async () => {
    await expect(page).toHaveURL(/.*\/product\/.*/);
    await expect(allPages.productPage.productTitle).toContainText(productName);
    await expect(allPages.productPage.productPrice).toContainText('9.17');
    await expect(allPages.productPage.addToCartButton).toBeVisible();
    await expect(allPages.productPage.addToFavoriteButton).toBeVisible();
  });

  await test.step('Add product to cart', async () => {
    await allPages.productPage.addToCartButtonClick();
    await expect(allPages.productPage.productAddAlert).toBeVisible();
    await expect(allPages.productPage.headerFragment.cartQuantityIcon).toContainText('1');
  });

  await test.step('Verify product is added to checkout', async () => {
    await allPages.productPage.headerFragment.cartQuantityIcon.click();
    await expect(page).toHaveURL(/checkout$/);
    expect(await allPages.checkOutPage.getProductQuantityByName(productName)).toBe('1');
    await expect(allPages.checkOutPage.proceedToCheckOutButton).toBeVisible();
  });
});
