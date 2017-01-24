(function ( $ ) {
    var _ = {
        lastScrollTop : 0,
        direction: null,
    };
    $.fn.lemniscate = function(options) {
        var defaults = {
            container : '.js-lemniscate-loop',
        };

        var o = $.extend( {}, defaults, options );
        $.fn.lemniscate._o = o;
        startLoop = function(){
            // $(window).on('mousewheel', $.fn.lemniscate.checkDirection );
            $(window).on('scroll',  handler.scroll);
            $.fn.lemniscate.clone();
        };
        $.fn.lemniscate.clone = function(){
            var loop_clone = $(o.container).clone();
            $(o.container).parent().prepend( loop_clone ).append( loop_clone );
            setTimeout(function(){
                $.fn.lemniscate.startPosition();
            }, 200);
        };
        $.fn.lemniscate.startPosition = function(){
            var center = $(o.container+':nth-child(2)').offset().top;
            $(window).scrollTop(center); 
        };

        // $.fn.lemniscate.checkDirection = function(){
        //     var down_clone = $(o.container+':last-child '),
        //         winPos     = $(window).scrollTop();

        //     if(event.deltaY <= 0){
        //         _.direction = 'up';    
        //     }else if(event.deltaY > 0){
        //         _.direction = 'down';
        //     }
            
        // },
        $.fn.lemniscate.destroy = function(){
            $(window).off('scroll');
            $(window).off('mousewheel');
        }
        $.fn.lemniscate.debug = function(){
            console.log(defaults , options);
        };

        // start your engines
        startLoop();
    };

    var handler = {
        scroll : function(){
            var down_clone    = $($.fn.lemniscate._o.container+':last-child '),
                win_height    = $(window).height(),
                win_width     = $(window).width(),
                winPos        = $(window).scrollTop(),
                clone_top     = down_clone.offset().top,
                loop_height   = $($.fn.lemniscate._o.container).parent().outerHeight(true);

            
            if(win_height + winPos >= loop_height ){
                var scroll_down_loop =  down_clone.outerHeight(true) - win_height + (win_width * .03); 
                $(window).scrollTop(scroll_down_loop); 
            }else if(winPos <= 0 ){
                var scroll_up_loop =  $($.fn.lemniscate._o.container).last().offset().top ; 
                $(window).scrollTop(scroll_up_loop); 
            }

        }
    };
    module.exports = $.fn.lemniscate;
}(jQuery));