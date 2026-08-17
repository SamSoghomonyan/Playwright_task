import { Page, Locator, expect } from '@playwright/test';

export class CatalogPage {
  readonly page: Page;

  private readonly filtersContainer: Locator;
  private readonly productNameDetail: Locator;
  private readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;

    this.filtersContainer = page.locator('#filters');
    this.productNameDetail = page.locator('[data-test="product-name"]');
    this.productCards = page.locator('[data-test^="product-"]');
  }

  async navigate() {
    await this.page.goto('https://practicesoftwaretesting.com/');
  }

  async filterBySubCategory(categoryName: string) {
    await this.filtersContainer.getByText(categoryName, { exact: true }).click();
  }

  async clickFirstProduct() {
    await this.productCards.first().click();
  }


  async expectFirstProductVisible() {
    await expect(this.productCards.first()).toBeVisible();
  }

  async expectProductDetailsLoaded() {
    await expect(this.productNameDetail).toBeVisible();
  }
}