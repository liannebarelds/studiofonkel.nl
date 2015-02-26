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
    setTimeout(function () {
      $('body').removeClass('has-loading-state')
    }, 300)
  }

  $('.menubutton').on('click', function () {
    var that = this
    $('body').addClass('has-loading-state')

    $('.menubutton').removeClass().addClass('menubutton')

    $('.pagewrapper').one('transitionend', function () {
      window.location = $(that).attr('href')
    })

    return false
  })


  $('.frontpage-item-link').on('click', function () {
    var that = this
    if (!$('body').hasClass('has-loading-state')) {
      var index = $(this).parents('.frontpage-item').index() + 1

      $('.frontpage').addClass('active-' + index)

      $('body').addClass('has-loading-state')

      $('.frontpage-item-background').one('transitionend', function () {
        window.location = $(that).attr('href')
      })
    }

    return false
  })

  // SCROLL: TODO OPTIMIZE
  var scroll = 0;
  $(window).on('scroll', function () {
    scroll = window.scrollY
    if (scroll > 0) {
      $('.pageheader').addClass('pageheader-scrolled')
    } else {
      $('.pageheader').removeClass('pageheader-scrolled')
    }
  })

});
