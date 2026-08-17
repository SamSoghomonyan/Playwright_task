import { test, expect } from '@playwright/test';
import { RegisterPage } from "../page-objects/register.page";
import { invalidEmailData } from "../Const";
import { validUserData } from "../Const";

test.describe('Registration Tests', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.navigateToRegister();
  });

  test('Should successfully register a new user with valid data', async ({ page }) => {

    await registerPage.register(validUserData);

    await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/register');
    await expect(page.locator('h3')).toHaveText('Customer registration');
  });

  test('Should display validation errors when submitting empty form', async () => {
    await registerPage.submit();

    await expect(registerPage.firstNameError).toContainText('First name is required');
    await expect(registerPage.lastNameError).toContainText('Last name is required');
    await expect(registerPage.dobError).toContainText('Date of Birth is required');
    await expect(registerPage.streetError).toContainText('Street is required');
    await expect(registerPage.houseNumberError).toContainText('House number is required');
    await expect(registerPage.postalCodeError).toContainText('Postcode is required');
    await expect(registerPage.cityError).toContainText('City is required');
    await expect(registerPage.countryError).toContainText('Country is required');
    await expect(registerPage.phoneError).toContainText('Phone is required');
    await expect(registerPage.emailError).toContainText('Email is required');
    await expect(registerPage.passwordError).toContainText('Password is required');
  });

  test('Should display error for invalid email format', async () => {

    await registerPage.fillForm(invalidEmailData);
    await registerPage.submit();

    await expect(registerPage.emailError).toContainText('Email format is invalid');
  });
});