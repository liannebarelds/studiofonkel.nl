(function($){
  'use strict'

  $(document).keydown(function(e) {
    if(e.which == 59 && e.ctrlKey) {
      $('body').toggleClass('has-grid-overlay-enabled')
    }
  })

} (jQuery));
