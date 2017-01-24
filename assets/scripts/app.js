// Require all js files needed 
var infinite = require('./infinite.js');


/* ========================================================================
* DOM-based Routing
*
* Only fires on data-states that match. If a data-sate contains a dash,
* replace the dash with an underscore when adding it to the object below.
*
* .noConflict()
* The routing is enclosed within an anonymous function so that you can
* always reference jQuery with $, even when in .noConflict() mode.
* ======================================================================== */


// Use this variable to set up the common and page specific functions. If you
// rename this variable, you will also need to rename the namespace below.

var myclean = {
   // All pages
   'common': {
      init: function() {
         console.log('init-state: Common');
         this.dev();
         $('.js-infinite-loop').infinite();
      },
      dev:function(){
         console.log('dev mode');
         // if 'g' is pressed turn on the development grid.  This if for development mode only!!!!

         $(window).on('keypress', function(event){
            console.log(event);
            if(event.which === 103) {
               $(document).find('.gridMe').toggleClass('hidden');
            }
         });
    
      }
   },
};




/* ========================================================================
* START THE APPLICATION JS FILE
* ======================================================================== */

(function($) {

   // The routing fires all common scripts, followed by the page specific scripts.
   // Add additional events for more control over timing e.g. a finalize event
   var UTIL = {
      fire: function(func, funcname, args) {
         var fire;
         var namespace = myclean;
         funcname = (funcname === undefined) ? 'init' : funcname;
         fire = func !== '';
         fire = fire && namespace[func];
         fire = fire && typeof namespace[func][funcname] === 'function';

         if (fire) {
            namespace[func][funcname](args);
         }
      },
      loadEvents: function() {
         // Fire common init JS
         UTIL.fire('common');

         var app_state = $('body').data('state').replace(/-/g, '_').split(/\s+/)[0];
         if(app_state.length > 0){
            UTIL.fire(app_state);
            UTIL.fire(app_state, 'finalize');
            console.log('app-state:', app_state);
         }else{
            console.log('stateless');
         }
         
         // Fire common finalize JS
         UTIL.fire('common', 'finalize');
      }
   };

   // Load Events
   $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
