const imagesLoaded = require('imagesloaded');

const init = () => {
  imagesLoaded.makeJQueryPlugin($);

  const slider = '.js-product-gallery:visible';

  if (!$(slider).length) return;

  $(`${slider} img`).eq(0).imagesLoaded(() => {
    $(slider).addClass('firstImageLoaded')
    renderSlider(slider);
  });
};

const renderSlider = slider => {
  const $slider = $(slider).not('.slick-initialized');
  const navFor = '.js-product-gallery-nav:visible';

  $slider.slick({
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  });

  if ($(`${navFor} .slider__item`).length < 2) {
    $(navFor).remove();
  }

  if (!$(navFor).length) return;

  $slider.slick('slickSetOption', 'asNavFor', navFor);

  $(navFor).not('.slick-initialized').slick({
    arrows: false,
    asNavFor: slider,
    slidesToShow: 8,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        }
      }
    ]
  });
};

export default {
  init
}
