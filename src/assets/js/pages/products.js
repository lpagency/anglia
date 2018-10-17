import { getProducts } from '../services/api';
import ProductListItemTmpl from '../templates/product-list-item.njk';
import background from '../plugins/background';
require('jquery-match-height');

export default function init() {
  const $products = $('.products');
  const $list = $('#products-list');

  if (0 === $list.length) return;

  // -- Elements
  const $loadMoreBtn = $('#products-load-more');
  const $searchBtn = $('#products-search');
  const $searchInput = $('#angliaSearch');
  const $loadMoreText = $loadMoreBtn.find('.button__text');

  // -- Events
  const REQUEST_START_EVENT = 'REQUEST_START_EVENT';
  const REQUEST_END_EVENT = 'REQUEST_END_EVENT';
  const LOAD_MORE_EVENT = 'LOAD_MORE_EVENT';
  const FILTERS_CHANGE_EVENT = 'FILTERS_CHANGE_EVENT';

  // -- Renders
  function renderProduct(product) {
    product.static_url = $("input[name=static_url]").val();
    return `<div class="group__item col-6 col-md-4">${ProductListItemTmpl.render(product)}</div>`;
  }

  function renderProducts(products) {
    return products.map(renderProduct).join('');
  }

  function processData(data) {
    if (1 === getPage()) {
      $list.html(renderProducts(data.products));
    } else {
      $list.append(renderProducts(data.products));
    }
    background.init();
    $('.js-match-product-content').matchHeight();
  }

  function handleRequest() {
    const urlParams = new URLSearchParams(location.search.slice(1));

    if (urlParams.has('search_word'))
    {
      const word = urlParams.get('search_word');
      var uri = window.location.toString();
      var clean_uri = uri.substring(0, uri.indexOf("?"));
      window.history.replaceState({}, document.title, clean_uri);
      $searchInput.val(word);
    }

    $products.trigger(REQUEST_START_EVENT);

    const tag_string = $('#tag_string').val();

    const queryParams = {
      page: getPage(),
      search: $searchInput.val(),
      search_engine: "false",
      tags: tag_string
    };


    getProducts(queryParams)
      .then(processData)
      .then(() => $products.trigger(REQUEST_END_EVENT))
      .catch((...args) => console.error(args))
    ;
  }

  // -- Utilities
  function getPage() {
    return parseInt($products.data('page'));
  }

  // -- Listeners
  function handleRequestStart() {
    $loadMoreBtn.prop('disabled', true);
    $loadMoreText.text('Cargando ...');
  }

  function handleRequestEnd() {
    $loadMoreBtn.prop('disabled', false);
    $loadMoreText.text('Cargar más');
  }

  function handleLoadMore() {
    handleRequest();
  }

  function handleLoadMoreBtnClick() {
    $searchInput.val("");
    $products.data('page', getPage() + 1);
    $products.trigger(LOAD_MORE_EVENT);
  }

  function handleSearchBtnClick() {
    $list.html("");
    $products.data('page', 1);
    $products.trigger(LOAD_MORE_EVENT);
  }

  function handleInputEnter(event) {
    event.preventDefault();

    if (event.keyCode === 13){
      $list.html("");
      $products.data('page', 1);
      $products.trigger(LOAD_MORE_EVENT);
    }
  }

  // -- Handle listeners
  $products.on(REQUEST_START_EVENT, handleRequestStart);
  $products.on(REQUEST_END_EVENT, handleRequestEnd);
  $products.on(LOAD_MORE_EVENT, handleLoadMore);
  $products.on(FILTERS_CHANGE_EVENT, handleRequest);
  $loadMoreBtn.on('click', handleLoadMoreBtnClick);
  $searchBtn.on('click', handleSearchBtnClick);
  $searchInput.on('keyup', handleInputEnter);

  // -- Initial loading
  handleRequest();
}
