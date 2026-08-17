import { test, expect } from '@playwright/test';
import { LoginPage } from "../page-objects/login.page";
import { RegisterPage } from '../page-objects/register.page';
import { validUserData } from "../Const";

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });

  test('Should successfully login with registered valid credentials', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.navigateToRegister();
    await registerPage.register(validUserData);

    await loginPage.navigateToLogin();

    await loginPage.login(validUserData.email, validUserData.password);

    await expect(page).toHaveURL(/.*\/auth\/login/);
  });

  test('Should display error for invalid credentials', async () => {
    await loginPage.login('non_existing_user@example.com', 'WrongPassword123!');

    await loginPage.expectLoginError('Invalid email or password');
  });

  test('Should display validation error for invalid email format', async () => {
    await loginPage.login('invalid-email-format', 'SomePassword123!');

    await loginPage.expectEmailError('Email format is invalid');
  });

  test('Should display validation error when submitting empty fields', async () => {
    await loginPage.login('', '');

    await loginPage.expectEmailError('Email is required');
  });
});