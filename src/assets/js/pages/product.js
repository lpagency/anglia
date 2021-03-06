import productGallery from '../components/product-gallery';
import productsSlider from '../components/products-slider';
import background from '../plugins/background';
import { getProduct, getProducts, getVariants, getVariantValues } from '../services/api';
import ProductTmpl from '../templates/product.njk';
import ProductsListItemTmpl from '../templates/product-list-item.njk';
require('jquery-match-height');

export default function init() {
  const $productView = $('.product--view');
  const $detail_name = $('.detail--name');

  if (0 === $productView.length) return;

  const queryParams = new URLSearchParams(location.search.slice(1));

  if (!queryParams.has('sku')) return;

  const sku = queryParams.get('sku');

  const REQUEST_START_EVENT = 'REQUEST_START_EVENT';
  const REQUEST_END_EVENT = 'REQUEST_END_EVENT';

  // const $productsReccomend = $('.products--recommended');
  const $productsReccomend = $('.section--products');

  function handleRequest() {
    $productView.trigger(REQUEST_START_EVENT);

    getProduct(sku)
      .then(processResponseSuccess)
      .then(renderProduct)
      .then((data) => $productView.trigger(REQUEST_END_EVENT, data))
      .catch(processResponseError)
    ;
  }

  function processResponseSuccess(data) {
    return data.product[0];
  }

  function renderProduct(product) {
    // set title
    $("title").html(product.name + " | Anglia");

    // render product
    product.static_url = $("input[name=static_url]").val();

    $detail_name.html(product.name);
    $productView.html(ProductTmpl.render(product));

    window.scrollTo(0, 1);
    window.scrollTo(0, 0);  // Fix animation plugins

    setTimeout(() => {
      productGallery.init();
    }, 500);

    return product;
  };

  function processRecommendProductsResponse(data) {
    return data.products;
  }

  function renderRecommendProducts(products) {
    const html = products
      .filter(p => p.sku !== sku)
      .map(p => renderRecommendProduct(p)).join('');

    $productsReccomend
      .find('.products__content')
      .html(html);

    $productsReccomend
      .removeClass('d-none');

    setTimeout(() => {
      productsSlider.init();
    }, 500);
    background.init();
    $('.js-match-product-content').matchHeight();
  }

  function renderRecommendProduct(product) {
    product.static_url = $("input[name=static_url]").val();
    return `<div class="group__item slider__item col-3 animation">${ProductsListItemTmpl.render(product)}</div>`;
  }

  function processResponseError() {
    $productView.html(`
      <div class="empty-box animation">
        <div class="empty-box__content">
          <h3 class="empty-box__title">Producto no encontrado</h3>
          <div class="empty-box__text h-text">
            <p>El producto que buscas no existe, prueba revisando nuestra lista de productos.</p>
          </div>
          <div class="empty-box__button">
            <a class="button button--secondary button--small" href="/products.html">
              <span class="button__text">Ver todos los productos</span>
            </a>
          </div>
        </div>
        <div class="empty-box__icon">
          <i class="material-icons">error_outline</i>
        </div>
      </div>
    `);
  }

  // -- Variants and variant values
  function handleVariantsRequest() {
    getVariants(sku)
    .then(processVariantsResponse)
    .then(handleVariantValuesRequest)
    .then(processVariantValuesResponse)
    .then(renderVariantValues)
    .catch(processVariantError);
  }

  function processVariantsResponse(response) {
    if (response.variants.length <= 0) return null;
    // Only return the first variant
    return Promise.resolve(response.variants[0].name);
  }

  function handleVariantValuesRequest(variant_name) {
    if (!variant_name) return null;
    return getVariantValues(variant_name, sku);
  }

  function processVariantValuesResponse(res) {
    if (!res) return [];
    return res.values[0].values;
  }

  function processVariantError(err) {
    console.log(err);
  }

  function renderVariantValues(values) {
    if (values.length <= 0) return;

    const container = $('.variant-container');
    container.html(values.map(
      (v, i) => `
        <div class="variant-value">
          <input type="radio" id="value-${i}" name="variant" value="${v}">
          <label for="value-${i}">${v}</label>
        </div>
      `
    ));

    $('.variant-container').on('click', 'input', onValuePress);
    selectFirstOption();
  }

  function onValuePress(e) {
    $('#open-cart').attr('product-combination', e.target.value);
  }

  function selectFirstOption() {
    const values = $('.variant-container > div > input');
    if (values.length > 0) values[0].click();
  }

  // -- Listeners
  function getRecommendProducts(e , product) {
    if (!product.tags) return;

    getProducts({
      tags: product.tags[0].name,
      items: 5,
    })
      .then(processRecommendProductsResponse)
      .then(renderRecommendProducts)
    ;
  }

  // -- Subscribe listeners
  $productView.on(REQUEST_END_EVENT, getRecommendProducts);

  handleRequest();
  handleVariantsRequest();
}
