/* global $ */

const API_URL = process.env.MIX_API_URL || 'https://apibodegas.loadingplay.com';
const SITE_NAME = process.env.MIX_SITE_NAME || 'anglia';
const SITE_ID = process.env.MIX_SITE_ID || 86;
const ACCESS_TOKEN = process.env.MIX_ACCESS_TOKEN || '';

const defaultOptions = {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
  },
  data: {
    site_name: SITE_NAME,
    site_id: SITE_ID,
    ignore_stock: false,
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
      order: 'DESC',
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
    data: {
      ...defaultOptions.data,
      sku,
    },
    url: `${API_URL}/v1/product`,
  }));
}

export {
  getProducts,
  getProduct,
};
