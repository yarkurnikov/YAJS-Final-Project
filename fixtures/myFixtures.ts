import { test as base } from '@playwright/test';
import { AllPages } from '../pages/allPages';
import { AUTH_CREDENTIALS } from '../constants/auth.constants';

type MyFixtures = {
  allPages: AllPages;
  loggedInApp: AllPages;
};

export const test = base.extend<MyFixtures>({
  allPages: async ({ page }, use) => {
    const allPages = new AllPages(page);
    await use(allPages);
  },

  loggedInApp: async ({ browser, request }, use) => {
    const response = await request.post('https://api.practicesoftwaretesting.com/users/login', {
      data: {
        'email': AUTH_CREDENTIALS.customer.email,
        'password': AUTH_CREDENTIALS.customer.password,
      }
    });

    const responseBody = await response.json() as { access_token: string };
    const authToken = responseBody.access_token;

    const context = await browser.newContext({
      extraHTTPHeaders: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    const page = await context.newPage();
    const allPages = new AllPages(page);
    
    await use(allPages);
    await context.close();
  }
});