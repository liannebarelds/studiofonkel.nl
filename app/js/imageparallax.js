$(function() {
 'use strict'

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

  onScroll()

  window.addEventListener('scroll', onScroll, false)
});
