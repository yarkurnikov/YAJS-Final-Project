import { Locator, Page } from '@playwright/test';

export class LoginPage {
  page: Page;
  emailField: Locator;
  passwordField: Locator;
  submitButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.emailField = this.page.getByTestId('email');
    this.passwordField = this.page.getByTestId('password');
    this.submitButton = this.page.getByTestId('login-submit');
  }


  async openLoginPage() {
    await this.page.goto('/auth/login');
    await this.emailField.waitFor({ state: 'visible' });
  }

  async performLogin(email: string, password: string): Promise<void> {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.submitButton.click();
  }

}