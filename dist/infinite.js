(function ( $ ) {
    var _ = {
        lastScrollTop : 0,
        direction: null,
    };
    $.fn.infinite = function(options) {
        var defaults = {
            container : '.js-infinite-loop',
        };

        var o = $.extend( {}, defaults, options );
        $.fn.infinite._o = o;
        startLoop = function(){
            $(window).on('scroll',  handler.scroll);
            $.fn.infinite.clone();
        };
        $.fn.infinite.clone = function(){
            var loop_clone = $(o.container).clone();
            $(o.container).parent().prepend( loop_clone ).append( loop_clone );
            setTimeout(function(){
                $.fn.infinite.startPosition();
            }, 200);
        };
        $.fn.infinite.startPosition = function(){
            var center = $(o.container+':nth-child(2)').offset().top;
            $(window).scrollTop(center); 
        };



        $.fn.infinite.destroy = function(){
            $(window).off('scroll');
            $(window).off('mousewheel');
        }
        $.fn.infinite.debug = function(){
            console.log(defaults , options);
        };

        startLoop();
    };

    var handler = {
        scroll : function(){
            var down_clone    = $($.fn.infinite._o.container+':last-child '),
                win_height    = $(window).height(),
                win_width     = $(window).width(),
                winPos        = $(window).scrollTop(),
                clone_top     = down_clone.offset().top,
                loop_height   = $($.fn.infinite._o.container).parent().outerHeight(true);


                        if(win_height + winPos >= loop_height ){
                var scroll_down_loop =  down_clone.outerHeight(true) - win_height + (win_width * .03); 
                $(window).scrollTop(scroll_down_loop); 
            }else if(winPos <= 0 ){
                var scroll_up_loop =  $($.fn.infinite._o.container).last().offset().top ; 
                $(window).scrollTop(scroll_up_loop); 
            }

        }
    };
    module.exports = $.fn.infinite;
}(jQuery));