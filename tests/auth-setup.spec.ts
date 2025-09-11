import { expect } from '@playwright/test';
import { test } from '../fixtures/myFixtures';
import { AUTH_CREDENTIALS } from '../constants/auth.constants';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('Login test with valid credentials', { tag: ['@smoke'] }, async ({ allPages, page }) => {
  test.skip(!!process.env.CI, 'Test is skipped on CI due to the Cloudflare protection.');

  await test.step('Open login page', async () => {
    await allPages.loginPage.openLoginPage();
  });

  await test.step('Perform login with valid credentials', async () => {
    await allPages.loginPage.performLogin(AUTH_CREDENTIALS.customer.email, AUTH_CREDENTIALS.customer.password);
  });

  await test.step('Verify successful login', async () => {
    await expect(page).toHaveURL(/.*\/account$/);
  });

  await test.step('Save authentication state', async () => {
    await page.context().storageState({ path: authFile });
  });
});