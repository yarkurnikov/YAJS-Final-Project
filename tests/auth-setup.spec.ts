import { expect } from '@playwright/test';
import { test } from '../fixtures/myFixtures';
import { AUTH_CREDENTIALS } from '../constants/auth.constants';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('Verify login with valid credentials @smoke', async ({ allPages, page }) => {

  await allPages.loginPage.openLoginPage();
  await allPages.loginPage.performLogin(AUTH_CREDENTIALS.customer.email, AUTH_CREDENTIALS.customer.password);
  await expect(page).toHaveURL(/.*\/account$/);

  await page.context().storageState({ path: authFile });
});
