/*!
 * jQuery Animation with scroll v1.0.0
 *
 * Gabriel Burgos
 * Released under the MIT license
 */

(function( $ ){
     $.animate = function(options) {
        var defaults = {
            items: '.animation:visible',
            class: 'animation-in',
            added_height: 500,
            before_height: -150
        };
        var opts = $.extend(defaults, options);
        var init = function(){
            if ( $(opts.items).length ){
                $('body').find( opts.items ).each(function(){
                    var _top = parseInt( $(this).offset().top );
                    var _current = parseInt( $(window).scrollTop() );
                    if ( _top < _current ){
                        $(this).addClass( opts.class )
                    }
                });
            }
            $(window).on('scroll',function(){
                var top = $(window).scrollTop() + 400;
                find( top );
            }).scroll();
            setTimeout(function(){
                $(window).scroll();
            },400);
        }
        var find = function(scroll){
            if ( $(opts.items).length ){
                var top_previous = 0;
                var items = 0;
                var delay = 0;
                var not_class = '.'+opts.class;
                $(opts.items).not(not_class).each(function(index,element){
                    var $element = $(element);
                    var top_current = $element.offset().top;
                    if (scroll + opts.added_height > top_current + opts.before_height) {
                        $element.addClass(opts.class);
                        if ( top_current === top_previous ){
                                items++;
                                delay = items / 5;
                                // css delay animation
                                $element.css({
                                    '-webkit-animation-delay' : delay + 's',
                                    '-moz-animation-delay' : delay + 's',
                                    'animation-delay' : delay + 's'
                                });
                        }
                        top_previous = top_current;
                    }
                });
            }
        }
        var remove = function(){
            $(find).addClass(opts.class);
        }
        init();
    }
})( jQuery );
