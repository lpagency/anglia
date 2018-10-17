/* global $ */

const API_URL = process.env.MIX_API_URL || 'https://apibodegas.loadingplay.com/v1';
const SITE_NAME = process.env.MIX_SITE_NAME || 'anglia';
const SITE_ID = process.env.MIX_SITE_ID || 86;
const ACCESS_TOKEN = process.env.MIX_ACCESS_TOKEN || getCookie("access_token");

function getCookie(cookie_name)
{
  var name = cookie_name + "=";
  var cookie_data = document.cookie.split(";");

  for(var i = 0; i < cookie_data.length; i++)
  {
      var cookie = cookie_data[i];

      while (cookie.charAt(0) == " ")
          cookie = cookie.substring(1);

      if (cookie.indexOf(name) === 0)
          return cookie.substring(name.length, cookie.length);
  }

  return "";
};

const defaultOptions = {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
  },
  data: {
    site_name: SITE_NAME,
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
    url: `${API_URL}/product/list`,
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
    url: `${API_URL}/product`,
  }));
}

export {
  getProducts,
  getProduct,
};
