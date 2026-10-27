import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class LinkPackElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getSearchField(): Locator {
    return this.page.locator('input[name="s"][type="search"]:visible').first();
  }

  getHeadings(): Locator {
    return this.page.locator('.elementor-heading-title');
  }

  getMenuCategoryLink(category: string): Locator {
    return this.page.locator('a:visible', { hasText: category }).first();
  }

  getProductLink(slug: string): Locator {
    return this.page.locator(`a[href*="/produto/${slug}/"]:visible`).first();
  }

  getProductTitle(): Locator {
    return this.page.locator('h1.product_title');
  }

  getMeasureOption(measure: string): Locator {
    return this.page
      .getByRole('radiogroup', { name: 'Medida' })
      .getByRole('radio', { name: measure, exact: true });
  }

  getAddToCartButton(): Locator {
    return this.page.locator('form.cart .single_add_to_cart_button');
  }
}
