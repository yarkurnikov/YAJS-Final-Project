import { expect } from '@playwright/test';
import { test } from '../fixtures/myFixtures';

test('​Verify user can view product details @smoke', async ({ allPages, page }) => {
  const productName = 'Combination Pliers';

  await page.goto(''); 

  await allPages.homePage.clickOnItemCardByName(productName);

  await expect(page).toHaveURL(/.*\/product\/.*/);
  await expect(allPages.productPage.productTitle).toContainText(productName);
  await expect(allPages.productPage.productPrice).toContainText('14.15');

  await expect(allPages.productPage.addToCartButton).toBeVisible();
  await expect(allPages.productPage.addToFavoriteButton).toBeVisible();

});


test('Verify user can add product to cart @smoke', async ({ allPages, page }) => {
  const productName = 'Slip Joint Pliers';

  await page.goto(''); 

  await allPages.homePage.clickOnItemCardByName(productName);

  await expect(page).toHaveURL(/.*\/product\/.*/);
  await expect(allPages.productPage.productTitle).toContainText(productName);
  await expect(allPages.productPage.productPrice).toContainText('9.17');

  await expect(allPages.productPage.addToCartButton).toBeVisible();
  await expect(allPages.productPage.addToFavoriteButton).toBeVisible();

  await allPages.productPage.addToCartButtonClick();
  await expect(allPages.productPage.productAddAlert).toBeVisible();
  await expect(allPages.productPage.headerFragment.cartQuantityIcon).toContainText('1');

  await allPages.productPage.headerFragment.cartQuantityIcon.click();
  await expect(page).toHaveURL(/checkout$/);

  expect(await allPages.checkOutPage.getProductQuantityByName(productName)).toBe('1');
  await expect(allPages.checkOutPage.proceedToCheckOutButton).toBeVisible();

});
