$(function() {
 'use strict'

  var previousUrl = sessionStorage.getItem('previous-url')
  var currentPageUrl = window.location.pathname
  sessionStorage.setItem('previous-url', currentPageUrl)

  // Set the previous clicked item inside an overview to active to transition back to the overview.
  if ($('.overview [href="' + previousUrl + '"]').length) {
    $('.overview [href="' + previousUrl + '"]').addClass('active')
    $('body').addClass('has-loading-state')

    setTimeout(function () {
      $('body').removeClass('has-loading-state')
      $('.overview [href="' + previousUrl + '"]').removeClass('active')
    }, 100)
  }
  else {
    $('body').removeClass('has-loading-state')
  }

  // parallax scroll:

  var lastScrollY = 0,
      ticking = false,
      windowHeight = window.innerHeight

  function onScroll() {
    lastScrollY = window.scrollY
    windowHeight = window.innerHeight
    requestTick()
  }

  function requestTick() {
    if(!ticking) {
        requestAnimationFrame(update)
        ticking = true
    }
  }

  function update() {

    $( ".scrollimage" ).each(function( index ) {
      var scrollImage         = $(this),
          scrollImageHeight   = scrollImage.innerHeight(),
          image               = $(this).children('img'),
          imageHeight         = image.innerHeight(),
          scrollImageMin      = scrollImage.offset().top,
          scrollImageMax      = scrollImageMin + scrollImageHeight,
          scrollPercentage    = (lastScrollY - (scrollImageMin - windowHeight)) / (scrollImageMax - (scrollImageMin - windowHeight)),
          translateY          = 0;

      if (scrollImageMax > lastScrollY && scrollImageMin < (windowHeight + lastScrollY)) {
        translateY = (imageHeight + scrollImageHeight) * scrollPercentage * -1 / 2
      }

      image.css( "transform", "translate3d(0, " + translateY + "px, 0)" );
    });

    ticking = false
}

  window.addEventListener('scroll', onScroll, false)

});
