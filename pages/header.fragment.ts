import { Page, Locator } from "@playwright/test";

export class HeaderFragment {
    page: Page;
    navMenu: Locator;
    signInButton: Locator;
    languageSelect: Locator;
    categoriesButton: Locator;
    contactButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navMenu = this.page.getByTestId("nav-menu");
        this.categoriesButton = this.page.getByTestId("nav-categories");
        this.contactButton = this.page.getByTestId("nav-contact");
        this.signInButton = this.page.getByTestId("nav-sign-in");
        this.languageSelect = this.page.getByTestId("language-select");
    }
} 