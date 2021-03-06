
export default class lemniscate {

    constructor(options) {
        this.defaults = {
            container: '#lemniscate'
        }
        this.o =  { ...this.defaults, ...options };

        this.lastScrollTop = 0
        this.direction = null

        this.clone();

        $(window).on("scroll", () => { this.scroll() });
    }
    

    clone(){
        var loop_clone = $(this.o.container).clone();
        console.log('clone')
        $(this.o.container).parent().prepend( loop_clone ).append( loop_clone );
        this.setStartPosition();
    }

    setStartPosition(){
        var center = $(`${this.o.container}:nth-child(2)`).offset().top;
        $(window).scrollTop(center); 
    }

    destroy (){
        $(window).off("scroll");
        // $(window).off('mousewheel');
    }
    
    scroll(){
        const bottom_clone   = $(`${this.o.container}:last-child`),
            win_height       = $(window).height(),
            win_width        = $(window).width(),
            winPos           = $(window).scrollTop(),
            loop_height      = $(this.o.container).parent().outerHeight(true),
            scroll_up_loop   = bottom_clone.offset().top,
            scroll_down_loop = bottom_clone.outerHeight(true) - win_height;


        if(win_height + winPos >= loop_height ){
            $(window).scrollTop(scroll_down_loop); 
        }else if(winPos <= 0 ){
            $(window).scrollTop(scroll_up_loop); 
        }

    }
 
}
 