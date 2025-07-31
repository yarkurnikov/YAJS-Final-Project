import { test, expect } from '@playwright/test';

test('Verify login with valid credentials', async ({ page }) => {
  await page.goto(''); 

  // Steps for Login
  await page.locator('[data-test="email"]').fill("customer@practicesoftwaretesting.com");
  await page.locator('[data-test="password"]').fill("welcome01");
  await page.locator('[data-test="login-submit"]').click()

  // 
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  await expect(page.locator('[data-test="page-title"]')).toHaveText("My account");
  await expect(page.locator('[data-test="nav-menu"]')).toHaveText('Jane Doe');
});
