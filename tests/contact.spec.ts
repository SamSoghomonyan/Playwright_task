import { test } from '@playwright/test';
import { ContactPage } from "../page-objects/contact.page";
import { ContactInfon } from "../Const";
import { ShortMessage } from "../Const";

test.describe('Contact Form Tests', () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.navigateToContact();
  });

  test('Should successfully send contact message with valid data', async () => {
    await contactPage.fillForm(ContactInfon);

    await contactPage.submit();

    await contactPage.expectSuccessMessage();
  });

  test('Should display validation errors when submitting empty form', async () => {
    await contactPage.submit();

    await contactPage.expectMultipleErrorMessages({
      firstName: 'First name is required',
      lastName: 'Last name is required',
      email: 'Email is required',
      subject: 'Subject is required',
      message: 'Message is required'
    });
  });

  test('Should display error for invalid email format', async () => {
    await contactPage.fillForm({
      email: 'invalid-email-format'
    });

    await contactPage.submit();

    await contactPage.expectErrorMessage('email', 'Email format is invalid');
  });

  test('Should display error when message is less than 50 characters', async () => {
    await contactPage.fillForm(ShortMessage);

    await contactPage.submit();

    await contactPage.expectErrorMessage('message', 'Message must be minimal 50');
  });
});