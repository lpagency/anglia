const imagesLoaded = require('imagesloaded');

const init = () => {
  imagesLoaded.makeJQueryPlugin($);

  const slider = '.js-hero-slider';

  if (!$(slider).length) return;

  renderSlider(slider);

  $(slider).imagesLoaded(() => {
    $(slider).addClass('background-loaded');
  });
};

const renderSlider = slider => {
  const $slider = $(slider);

  $slider.slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    speed: 1400,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
        }
      }
    ]
  });
};

export default {
  init
}
