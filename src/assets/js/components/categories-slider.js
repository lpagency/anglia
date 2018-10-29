import background from './../plugins/background';

const init = () => {
  const slider = '.js-categories-slider';

  if (!$(slider).length) return;

  renderSlider(slider);
};

const renderSlider = slider => {
  const $slider = $(slider);

  $slider.on('init', () => {
    background.init();
  });

  $slider.slick({
    dots: true,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1023,
        settings: 'unslick',
      },
    ]
  });
};

export default {
  init
}
