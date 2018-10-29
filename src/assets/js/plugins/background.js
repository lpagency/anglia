const imagesLoaded = require('imagesloaded');

const init = () => {
  imagesLoaded.makeJQueryPlugin($);
  
  return $('.js-background').each((i, e) => {
    load(e);
  });
};

const load = (e) => {
  let $element = $(e);
  let $background = $element.find('.h-background');
  let length = $background.length;
  
  $background.each((i, e) => {
    let current = $(e);
    let src = current.find('img').attr('src') || '';
    
    if ( src === '' ) return;
    
    current.imagesLoaded({
      background: true
    }, () => {
      current.css('background-image', 'url(' + src + ')');
      current.addClass('background-loaded');
      $element.addClass('background-loaded');
    });
  });
};

export default {
  init
}
