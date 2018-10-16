require('jquery-match-height');
import background from './../plugins/background';

const init = () => {
  const slider = '.js-products-slider';

  if (!$(slider).length) return;

  renderSlider(slider);
};

const renderSlider = slider => {
  const $slider = $(slider);

  $slider.on('init', () => {
    background.init();
    $('.js-match-product-content').matchHeight();
  });

  $slider.slick({
    dots: true,
    centerMode: true,
    centerPadding: '70px',
    focusOnSelect: true,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 374,
        settings: {
          centerPadding: '90px',
        }
      },
      {
        breakpoint: 410,
        settings: {
          centerPadding: '110px',
        }
      },
      {
        breakpoint: 767,
        settings: {
          centerPadding: '220px',
        }
      },
      {
        breakpoint: 1023,
        settings: {
          dots: false,
          focusOnSelect: false,
          centerMode: false,
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
    ]
  });
};

export default {
  init
}
