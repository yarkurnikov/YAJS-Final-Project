import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AUTH_CREDENTIALS } from '../constants/auth.constants';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('Verify login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.openLoginPage();
  await loginPage.performLogin(AUTH_CREDENTIALS.customer.email, AUTH_CREDENTIALS.customer.password);
  await expect(page).toHaveURL(/.*\/account$/);

  await page.context().storageState({ path: authFile });
});
