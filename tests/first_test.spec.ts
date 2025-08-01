import { test, expect } from '@playwright/test';

test('Verify login with valid credentials', async ({ page }) => {
  await page.goto('/auth/login'); 

  // Steps for Login
  await page.getByTestId("email").fill("customer@practicesoftwaretesting.com");
  await page.getByTestId("password").fill("welcome01");
  await page.getByTestId("login-submit").click()

  // 
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  await expect(page.getByTestId("page-title")).toHaveText("My account");
  await expect(page.getByTestId("nav-menu")).toHaveText('Jane Doe');
});
