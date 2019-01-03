/* global $ */

const API_URL = process.env.MIX_API_URL || 'https://apibodegas.loadingplay.com';
const SITE_NAME = process.env.MIX_SITE_NAME || 'anglia';
const SITE_ID = process.env.MIX_SITE_ID || 86;

const defaultOptions = {
  method: 'POST',
  data: {
    site_name: SITE_NAME
  },
};


/**
 * Get products from API
 *
 * @param {Object} queryParams (Support: page, items, metadata, column, order, tags)
 */
function getProducts(queryParams) {
  return Promise.resolve($.ajax({
    ...defaultOptions,
    data: {
      ...defaultOptions.data,
      page: 1,
      items: 12,
      column: 'id',
      direction: 'DESC',
      ignore_stock: false,
      ...queryParams,
    },
    url: `${API_URL}/product/search`,
  }));
};


/**
 * Get a single product from API
 * @param {String} sku
 */
function getProduct(sku) {
  return Promise.resolve($.ajax({
    ...defaultOptions,
    method: 'GET',
    data: {
      ...defaultOptions.data,
      sku,
    },
    url: `${API_URL}/v1/product`,
  }));
}

/**
 * Get variants of a product
 */

function getVariants(sku) {
  return Promise.resolve(
    $.ajax(
      {
        ...defaultOptions,
        method: 'GET',
        data: {
          ...defaultOptions.data,
          sku
        },
        url:`${API_URL}/v1/variant`
      }
    )
  );
}

function getVariantValues(variant_name, sku) {
  return Promise.resolve(
    $.ajax(
      {
        ...defaultOptions,
        method: 'GET',
        data: {
          ...defaultOptions.data,
          sku
        },
        url:`${API_URL}/v1/variant/${variant_name}/value`
      }
    )
  );
}

export {
  getProducts,
  getProduct,
  getVariants,
  getVariantValues
};
