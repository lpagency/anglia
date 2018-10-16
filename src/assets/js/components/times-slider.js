const init = () => {
  const slider = '.js-times-slider';

  if (!$(slider).length) return;

  renderSlider(slider);
};

const renderSlider = slider => {
  const $slider = $(slider);
  const navFor = '.js-times-navigation'

  $slider.slick({
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  });

  $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    $('.card-time__image.animation').removeClass('animation-in');

    setTimeout(() => {
      $(`${slider} .slick-slide[data-slick-index="${nextSlide}"] .card-time__image`).addClass('animation-in');
    }, 100);
  });

  if (!$(navFor).length) return;

  $slider.slick('slickSetOption', 'asNavFor', navFor);

  $(navFor).slick({
    arrows: false,
    asNavFor: slider,
    slidesToShow: 6,
    slidesToScroll: 1,
    focusOnSelect: true,
  });
};

export default {
  init
}
