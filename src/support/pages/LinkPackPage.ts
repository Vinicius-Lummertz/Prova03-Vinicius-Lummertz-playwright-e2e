import { Page, expect } from '@playwright/test';
import LinkPackElements from '../elements/LinkPackElements';
import BasePage from './BasePage';

export default class LinkPackPage extends BasePage {
  readonly linkPackElements: LinkPackElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.linkPackElements = new LinkPackElements(page);
  }

  async searchProduct(term: string): Promise<void> {
    await this.linkPackElements.getSearchField().fill(term);
    await this.linkPackElements.getSearchField().press('Enter');
  }

  async validateSearchResults(term: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`[?&]s=${term}`));
    await expect(this.page).toHaveTitle(
      new RegExp(`Você pesquisou por ${term}`)
    );
    await expect(
      this.linkPackElements
        .getHeadings()
        .filter({ hasText: 'Envelope de Segurança' })
        .first()
    ).toBeVisible();
  }

  async openCategory(category: string): Promise<void> {
    await this.linkPackElements.getMenuCategoryLink(category).click();
  }

  async validateCategory(category: string, slug: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`/prod-categoria/${slug}/?$`));
    await expect(this.page).toHaveTitle(new RegExp(category));
  }

  async openProduct(slug: string): Promise<void> {
    await this.linkPackElements.getProductLink(slug).click();
  }

  async validateProductPage(name: string, slug: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`/produto/${slug}/?$`));
    await expect(this.linkPackElements.getProductTitle()).toContainText(name);
    await expect(this.linkPackElements.getAddToCartButton()).toBeVisible();
  }

  async validateSelectedMeasure(measure: string): Promise<void> {
    await expect(
      this.linkPackElements.getMeasureOption(measure)
    ).toHaveAttribute('aria-checked', 'true');
  }
}
