import { Page, Locator, expect } from '@playwright/test';

import { ContactErrorFields } from "../Type";

export class ContactPage {
  readonly page: Page;

  private readonly navContactButton: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly subjectSelect: Locator;
  private readonly messageInput: Locator;
  private readonly submitButton: Locator;

  private readonly successAlert: Locator;
  private readonly errorLocators: Record<ContactErrorFields, Locator>;

  constructor(page: Page) {
    this.page = page;

    this.navContactButton = page.locator('[data-test="nav-contact"]');
    this.firstNameInput = page.locator('[data-test="first-name"]');
    this.lastNameInput = page.locator('[data-test="last-name"]');
    this.emailInput = page.locator('[data-test="email"]');
    this.subjectSelect = page.locator('[data-test="subject"]');
    this.messageInput = page.locator('[data-test="message"]');
    this.submitButton = page.locator('[data-test="contact-submit"]');

    this.successAlert = page.locator('.alert-success');

    this.errorLocators = {
      firstName: page.locator('[data-test="first-name-error"]'),
      lastName: page.locator('[data-test="last-name-error"]'),
      email: page.locator('[data-test="email-error"]'),
      subject: page.locator('[data-test="subject-error"]'),
      message: page.locator('[data-test="message-error"]'),
    };
  }


  async navigateToContact() {
    await this.page.goto('https://practicesoftwaretesting.com/');
    await this.navContactButton.click();
  }

  async fillForm(formData: {
    firstName?: string;
    lastName?: string;
    email?: string;
    subject?: string;
    message?: string;
  }) {
    if (formData.firstName !== undefined) await this.firstNameInput.fill(formData.firstName);
    if (formData.lastName !== undefined) await this.lastNameInput.fill(formData.lastName);
    if (formData.email !== undefined) await this.emailInput.fill(formData.email);
    if (formData.subject !== undefined) await this.subjectSelect.selectOption(formData.subject);
    if (formData.message !== undefined) await this.messageInput.fill(formData.message);
  }

  async submit() {
    await this.submitButton.click();
  }


  async expectErrorMessage(field: ContactErrorFields, expectedText: string) {
    await expect(this.errorLocators[field]).toContainText(expectedText);
  }

  async expectMultipleErrorMessages(errors: Partial<Record<ContactErrorFields, string>>) {
    for (const [field, expectedText] of Object.entries(errors)) {
      await expect(this.errorLocators[field as ContactErrorFields]).toContainText(expectedText);
    }
  }

  async expectSuccessMessage() {
    await expect(this.successAlert).toContainText('Thanks for your message!');
  }
}