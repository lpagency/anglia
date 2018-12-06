require('./bootstrap');
require('./plugins/animate');

import background from './plugins/background';
import equalize from './plugins/equalize';

import mobile from './components/mobile';
import filters from './components/filters';
import TagFilters from './components/TagFilters';
import orderby from './components/orderby';

import heroSlider from './components/hero-slider';
import timesSlider from './components/times-slider';
import categoriesSlider from './components/categories-slider';

import Products from './pages/products';
import Product from './pages/product';
import Home from './pages/home';

$(document).ready($ => {
  background.init();
  equalize.init();

  mobile.init();
  filters.init();

  heroSlider.init();
  timesSlider.init();

  categoriesSlider.init();

  orderby.init();

  // Init filter logic with filters in products.html
  new TagFilters(
    'cat1',
    'cat2',
    'cat3',
    'cat4',
    'cat5',
    'cat6',
    'cat7',
    'cat8'
  );

  // -- Pages
  Products();
  Product();
  Home();
});

$(window).on('load', () => {
  $.animate({
    items: '.animation:visible',
    class: 'animation-in',
    added_height: 300,
    before_height: -200
  });
});

