import { test } from '@playwright/test';
import { SearchPage } from "../page-objects/search.page";

test.describe('Search Functionality Tests', () => {
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    await searchPage.navigate();
  });

  test('Should display "no results" message when searching for non-existing product', async () => {
    const nonExistingQuery = 'unknown_toy';

    await searchPage.search(nonExistingQuery);

    await searchPage.expectNoResults();
    await searchPage.expectSearchTerm(nonExistingQuery);
  });

  test('Should successfully search for an existing product and open details', async () => {
    const searchQuery = 'Combination Pliers';

    await searchPage.search(searchQuery);

    await searchPage.expectSearchTerm(searchQuery);
    await searchPage.expectFirstProductVisible();

    await searchPage.clickFirstProduct();

    await searchPage.expectProductName(searchQuery);
  });

  test('Should trim search query and return matching products', async () => {
    const searchQueryWithSpaces = 'Combination Pliers    ';

    await searchPage.search(searchQueryWithSpaces);

    await searchPage.expectSearchTerm('Combination Pliers');
    await searchPage.expectFirstProductVisible();

    await searchPage.clickFirstProduct();

    await searchPage.expectProductName('Combination Pliers');
  });
});