import { Page, Locator } from '@playwright/test';
import RegisterFormData from "../Type";

export class RegisterPage {
  readonly page: Page;

  private readonly signInNavButton: Locator;
  private readonly registerLink: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly dobInput: Locator;
  private readonly streetInput: Locator;
  private readonly houseNumberInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly cityInput: Locator;
  private readonly stateInput: Locator;
  private readonly countrySelect: Locator;
  private readonly phoneInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;

  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly dobError: Locator;
  readonly streetError: Locator;
  readonly houseNumberError: Locator;
  readonly postalCodeError: Locator;
  readonly cityError: Locator;
  readonly stateError: Locator;
  readonly countryError: Locator;
  readonly phoneError: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;

  constructor(page: Page) {
    this.page = page;

    this.signInNavButton = page.locator('[data-test="nav-sign-in"]');
    this.registerLink = page.locator('[data-test="register-link"]');

    this.firstNameInput = page.locator('[data-test="first-name"]');
    this.lastNameInput = page.locator('[data-test="last-name"]');
    this.dobInput = page.locator('[data-test="dob"]');
    this.streetInput = page.locator('[data-test="street"]');
    this.houseNumberInput = page.locator('[data-test="house_number"]');
    this.postalCodeInput = page.locator('[data-test="postal_code"]');
    this.cityInput = page.locator('[data-test="city"]');
    this.stateInput = page.locator('[data-test="state"]');
    this.countrySelect = page.locator('[data-test="country"]');
    this.phoneInput = page.locator('[data-test="phone"]');
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.submitButton = page.locator('[data-test="register-submit"]');

    this.firstNameError = page.locator('[data-test="first-name-error"]');
    this.lastNameError = page.locator('[data-test="last-name-error"]');
    this.dobError = page.locator('[data-test="dob-error"]');
    this.streetError = page.locator('[data-test="street-error"]');
    this.houseNumberError = page.locator('[data-test="house_number-error"]');
    this.postalCodeError = page.locator('[data-test="postal_code-error"]');
    this.cityError = page.locator('[data-test="city-error"]');
    this.stateError = page.locator('[data-test="state-error"]');
    this.countryError = page.locator('[data-test="country-error"]');
    this.phoneError = page.locator('[data-test="phone-error"]');
    this.emailError = page.locator('[data-test="email-error"]');
    this.passwordError = page.locator('[data-test="password-error"]');
  }

  async navigateToRegister() {
    await this.page.goto('https://practicesoftwaretesting.com/');
    await this.signInNavButton.click();
    await this.registerLink.click();
  }

  async fillForm(data: RegisterFormData) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.dobInput.fill(data.dob);

    if (data.street) await this.streetInput.fill(data.street);
    if (data.houseNumber) await this.houseNumberInput.fill(data.houseNumber);

    await this.postalCodeInput.fill(data.postalCode);

    if (data.city) await this.cityInput.fill(data.city);
    if (data.state) await this.stateInput.fill(data.state);

    await this.countrySelect.selectOption(data.country);
    await this.phoneInput.fill(data.phone);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async register(data: RegisterFormData) {
    await this.fillForm(data);
    await this.submit();
  }
}