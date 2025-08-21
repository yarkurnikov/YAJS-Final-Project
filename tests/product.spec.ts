import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { CheckOutPage } from '../pages/check.out.page';

test('​Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const productName = 'Combination Pliers';

  await page.goto(''); 

  await homePage.clickOnItemCardByName(productName);

  await expect(page).toHaveURL(/.*\/product\/.*/);
  await expect(productPage.productTitle).toContainText(productName);
  await expect(productPage.productPrice).toContainText('14.15');

  await expect(productPage.addToCartButton).toBeVisible();
  await expect(productPage.addToFavoriteButton).toBeVisible();

});


test('Verify user can add product to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const checkOutPage = new CheckOutPage(page);
  const productName = 'Slip Joint Pliers';

  await page.goto(''); 

  await homePage.clickOnItemCardByName(productName);

  await expect(page).toHaveURL(/.*\/product\/.*/);
  await expect(productPage.productTitle).toContainText(productName);
  await expect(productPage.productPrice).toContainText('9.17');

  await expect(productPage.addToCartButton).toBeVisible();
  await expect(productPage.addToFavoriteButton).toBeVisible();

  await productPage.addToCartButtonClick();
  await expect(productPage.productAddAlert).toBeVisible();
  await expect(productPage.headerFragment.cartQuantityIcon).toContainText('1');

  await productPage.headerFragment.cartQuantityIcon.click();
  await expect(page).toHaveURL(/checkout$/);

  expect(await checkOutPage.getProductQuantityByName(productName)).toBe('1');
  await expect(checkOutPage.proceedToCheckOutButton).toBeVisible();

});
