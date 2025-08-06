import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { AccountPage } from '../pages/account.page';

test('Verify login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  await page.goto('/auth/login'); 

  await loginPage.performLogin("customer@practicesoftwaretesting.com", "welcome01");

  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  await expect(accountPage.pageTitle).toHaveText("My account");
  await expect(accountPage.header.navMenu).toHaveText('Jane Doe');
});

test('​Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);

  await page.goto(''); 

  await homePage.clickOnItemCardByName("Combination Pliers");

  await expect(page).toHaveURL(/.*\/product\/.*/);
  await expect(page.getByTestId("product-name")).toHaveText("Combination Pliers"); 
  await expect(page.getByTestId("unit-price")).toHaveText('14.15');

  await expect(page.getByTestId("add-to-cart")).toBeVisible();
  await expect(page.getByTestId("add-to-favorites")).toBeVisible();

});
