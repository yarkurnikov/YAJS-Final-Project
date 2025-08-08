import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { AccountPage } from '../pages/account.page';
import { ProductPage } from '../pages/product.page';

test('Verify login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  await loginPage.openLoginPage();

  await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');

  await expect(page).toHaveURL(/.*\/account$/);
  await expect(accountPage.pageTitle).toHaveText('My account');
  await expect(accountPage.header.navMenu).toHaveText('Jane Doe');
});

test('​Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  await page.goto(''); 

  await homePage.clickOnItemCardByName('Combination Pliers');

  await expect(page).toHaveURL(/.*\/product\/.*/);
  await expect(productPage.productTitle).toContainText('Combination Pliers');
  await expect(productPage.productPrice).toContainText('14.15');

  await expect(productPage.addToCartButton).toBeVisible();
  await expect(productPage.addToFavoriteButton).toBeVisible();

});
