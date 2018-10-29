require('bootstrap-select');

const init = () => {
  const filters = '.js-filters';
  const order = '#productsOrder';
  const toggleFilters = '.js-toggle-filters';

  $(filters).each((i, e) => {
    if (!$(e).find('.filter input:checked').length) return;

    $(e).find('.collapse').collapse('show');
  });

  $(order).selectpicker({
    width: '220px',
    dropupAuto: false,
  });

  $(toggleFilters).on('click', function(e) {
    toogleFiltersBox(toggleFilters);
  });
};

const toogleFiltersBox = button => {
  const filtersGroup = '.js-filters-group';

  if ($(filtersGroup).hasClass('filters-group--is-open')) {
    $(button).removeClass('filters-toggle--is-open');
    $(filtersGroup).removeClass('filters-group--is-open');
    return;
  };

  $(button).addClass('filters-toggle--is-open');
  $(filtersGroup).addClass('filters-group--is-open');
}

export default {
  init
}
