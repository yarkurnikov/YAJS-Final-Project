import { test as base } from '@playwright/test';
import { AllPages } from '../pages/allPages';

type MyFixtures = {
  allPages: AllPages;
  loggedInApp: AllPages;
};

export const test = base.extend<MyFixtures>({
  allPages: async ({ page }, use) => {
    const allPages = new AllPages(page);
    await use(allPages);
  },

  loggedInApp: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: './playwright/.auth/user.json' });
    const page = await context.newPage();
    const allPages = new AllPages(page);
    await use(allPages);
    await context.close();
  }
});