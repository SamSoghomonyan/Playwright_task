import { test } from '@playwright/test';
import { CatalogPage } from "../page-objects/catalog.page";
import { SubCategories } from "../Const";

test.describe('Catalog Subcategory Filtering Tests', () => {
  let catalogPage: CatalogPage;

  test.beforeEach(async ({ page }) => {
    catalogPage = new CatalogPage(page);
    await catalogPage.navigate();
  });


  for (const subCategory of SubCategories) {
    test(`Should filter by subcategory: "${subCategory}" and open product details`, async () => {
      await catalogPage.filterBySubCategory(subCategory);

      await catalogPage.expectFirstProductVisible();

      await catalogPage.clickFirstProduct();

      await catalogPage.expectProductDetailsLoaded();
    });
  }
});