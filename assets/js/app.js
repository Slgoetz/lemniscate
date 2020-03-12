// Require all js files needed 
import '../scss/main.scss'
import lemniscate from './lemniscate'

   // Load Events
   $(document).ready( function(){

      $(window).on('keypress', function(event){
         console.log(event);
         if(event.which === 103) {
            $(document).find('.gridMe').toggleClass('hidden');
         }
      });

      const looper = new lemniscate({container:'#page'})
   });
