import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import LinkPackPage from '../support/pages/LinkPackPage';

test.describe('Link Pack', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let linkPackPage: LinkPackPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.linkpack')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    linkPackPage = new LinkPackPage(page);
    await page.goto(BASE_URL);
  });

  test('Buscar produto pelo campo de pesquisa', async () => {
    await linkPackPage.searchProduct('envelope');
    await linkPackPage.validateSearchResults('envelope');
  });

  test('Navegar para uma categoria pelo menu', async () => {
    await linkPackPage.openCategory('Filme Stretch');
    await linkPackPage.validateCategory('Filme Stretch', 'filme-stretch');
  });

  test('Abrir produto em destaque pela home', async () => {
    await linkPackPage.openProduct('envelope-de-seguranca-preto-12x18');
    await linkPackPage.validateProductPage(
      'Envelope de Segurança Preto – 12×18',
      'envelope-de-seguranca-preto-12x18'
    );
    await linkPackPage.validateSelectedMeasure('12x18');
  });
});
