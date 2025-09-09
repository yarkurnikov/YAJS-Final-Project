import { expect } from '@playwright/test';
import { test } from '../fixtures/myFixtures';
import { AUTH_CREDENTIALS } from '../constants/auth.constants';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('Login test with valid credentials', { tag: ['@smoke'] }, async ({ allPages, page }) => {
  test.skip(!!process.env.CI, 'Test is skipped on CI due to the Cloudflare protection.');

  await allPages.loginPage.openLoginPage();
  await allPages.loginPage.performLogin(AUTH_CREDENTIALS.customer.email, AUTH_CREDENTIALS.customer.password);
  await expect(page).toHaveURL(/.*\/account$/);

  await page.context().storageState({ path: authFile });
});