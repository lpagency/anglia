const init = () => {
  let windowWidth = $(window).width();
  let mobileLimit = 1024;
  let $secretmenu = $('.js-secretmenu');
  let brandingHtml = $('.js-header-branding').html();

  $('.js-navigation .branding').html(brandingHtml);

  $('.menu .menu-item.has-submenu > a').click(function(e) {
    if (windowWidth >= mobileLimit) return;

    e.preventDefault();

    let $button = $(this).parent();

    if ($button.hasClass('has-submenu--is-open')) {
      $button.removeClass('has-submenu--is-open');
      $button.find('.submenu').removeClass('submenu--is-open');
      return;
    }
    
    hideMobileSubmenu();

    $button.addClass('has-submenu--is-open');
    $button.find('.submenu').addClass('submenu--is-open');
  });

  $('.menu-item--menu > a').click(function(e) {
    if (windowWidth >= mobileLimit) return;

    e.preventDefault();

    hideMobileSubmenu();
    
    if ($secretmenu.hasClass('secretmenu--is-open')) {
      $('body').removeClass('menu--is-open');
      $secretmenu.removeClass('secretmenu--is-open');
      return;
    }

    $('body').addClass('menu--is-open');
    $secretmenu.addClass('secretmenu--is-open');
  });

  $('.js-footer-widget-collapse').click(function(e) {
    if (windowWidth >= mobileLimit) return;
    e.preventDefault();
    toggleCollapse(this);
  })
};

const toggleCollapse = el => {
  let $el = $(el);
  let $parent = $el.parent();

  if ($parent.hasClass('collapse--is-open')) {
    $parent.removeClass('collapse--is-open');
    return;
  }

  $parent.addClass('collapse--is-open');
};

const hideMobileSubmenu = () => {
  $('.menu .menu-item.has-submenu.has-submenu--is-open').removeClass('has-submenu--is-open');
  $('.menu .submenu.submenu--is-open').removeClass('submenu--is-open');
};

export default {
  init
}
