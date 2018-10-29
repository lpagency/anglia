import { getProducts } from '../services/api';
import ProductListItemTmpl from '../templates/product-list-item.njk';
import background from '../plugins/background';
require('jquery-match-height');

export default function init() {
  const $home = $('#home__products_featured');

  if (0 === $home.length) return;

  getProducts({
    column: 'position',
    order: 'DESC',
    items: 8,
  })
    .then(processResponse)
    .then(renderProducts)
    .then(insertProducts)
  ;

  function processResponse(data) {
    return data.products;
  }

  function renderProducts(products) {
    return products.map(renderProduct).join('');
  }

  function renderProduct(product) {
    return `<div class="group__item col-6 col-md-4 col-lg-3 animation">${ProductListItemTmpl.render(product)}</div>`;
  }

  function insertProducts(html) {
    $home
      .find('.products__content')
      .html(html);

      $home.removeClass('d-none');
      background.init();

      $('.js-match-product-content').matchHeight();
  }
}
