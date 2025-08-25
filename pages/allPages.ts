import { Page } from '@playwright/test';
import { AccountPage } from './account.page';
import { CheckOutPage } from './check.out.page';
import { HomePage } from './home.page';
import { ProductPage } from './product.page';
import { LoginPage } from './login.page';

export class AllPages {
  accountPage: AccountPage;
  checkOutPage: CheckOutPage;
  homePage: HomePage;
  loginPage: LoginPage;
  productPage: ProductPage;

  constructor(page: Page) {
    this.accountPage = new AccountPage(page);
    this.checkOutPage = new CheckOutPage(page);
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
    this.productPage = new ProductPage(page);

  }
}