import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  private readonly signInNavButton: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;

  private readonly emailError: Locator;
  private readonly passwordError: Locator;
  private readonly loginError: Locator; // Սխալ email/password-ի ընդհանուր էռորը

  constructor(page: Page) {
    this.page = page;

    this.signInNavButton = page.locator('[data-test="nav-sign-in"]');
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.submitButton = page.locator('[data-test="login-submit"]');

    this.emailError = page.locator('[data-test="email-error"]');
    this.passwordError = page.locator('[data-test="password-error"]');
    this.loginError = page.locator('[data-test="login-error"]');
  }

  async navigateToLogin() {
    await this.page.goto('https://practicesoftwaretesting.com/');
    await this.signInNavButton.click();
  }

  async login(email: string, password?: string) {
    if (email) await this.emailInput.fill(email);
    if (password) await this.passwordInput.fill(password);
    await this.submitButton.click();
  }


  async expectEmailError(expectedText: string) {
    await expect(this.emailError).toHaveText(expectedText);
  }

  async expectLoginError(expectedText: string) {
    await expect(this.loginError).toHaveText(expectedText);
  }
}