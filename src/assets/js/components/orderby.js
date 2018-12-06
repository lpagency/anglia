// jQuery global

const init = () => {
  $('select.order-products__select').change(function() {
    const selected = $('option:selected', this);
    updateHiddenInput(selected.attr('column'), selected.attr('direction'));
    $('.products').trigger('ORDERBY_CHANGE_EVENT');
  });
};

const updateHiddenInput = (column, direction) => {
  $('#column__order').val(column);
  $('#direction__order').val(direction);
};

export default {
  init
};
