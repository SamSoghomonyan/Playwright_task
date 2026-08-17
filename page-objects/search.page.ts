import { Page, Locator, expect } from '@playwright/test';

export class SearchPage {
  readonly page: Page;

  private readonly searchInput: Locator;
  private readonly searchSubmitButton: Locator;
  private readonly searchResetButton: Locator;

  readonly noResultsMessage: Locator;
  readonly searchResultCount: Locator;
  readonly searchTermBadge: Locator;
  readonly productCards: Locator;
  readonly productName: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchSubmitButton = page.locator('[data-test="search-submit"]');
    this.searchResetButton = page.locator('[data-test="search-reset"]');

    this.noResultsMessage = page.locator('[data-test="no-results"]');
    this.searchResultCount = page.locator('[data-test="search-result-count"]');
    this.searchTermBadge = page.locator('[data-test="search-term"]');

    this.productCards = page.locator('[data-test^="product-"]');
    this.productName = page.locator('[data-test="product-name"]');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchSubmitButton.click();
  }

  async resetSearch() {
    await this.searchResetButton.click();
  }

  async clickFirstProduct() {
    await this.productCards.first().click();
  }


  async expectNoResults() {
    await expect(this.noResultsMessage).toBeVisible();
  }

  async expectSearchTerm(term: string) {
    await expect(this.searchTermBadge).toContainText(term.trim());
  }

  async expectFirstProductVisible() {
    await expect(this.productCards.first()).toBeVisible();
  }

  async expectProductName(expectedName: string) {
    await expect(this.productName).toBeVisible();
    await expect(this.productName).toContainText(expectedName);
  }
}