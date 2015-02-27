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

  $('.overview a').on('click', function () {
    var that = this
    $('body').addClass('has-loading-state')
    $(this).addClass('active')

    $('.wrapper').one('transitionend', function () {
      window.location = $(that).attr('href')
    })

    return false
  })

  $('.menubutton, .logo-link').on('click', function () {
    var that = this
    $('body').addClass('has-loading-state')

    $('.menubutton').removeClass().addClass('menubutton')

    $('.wrapper').one('transitionend', function () {
      window.location = $(that).attr('href')
    })

    return false
  })

  $('.frontpage-item-link.contact').on('click', function () {
    $('body,html').animate({scrollTop: $(window).height()}, 400)
    return false
  })

  $('.frontpage-item-link:not(.contact)').on('click', function () {

    $('body,html').animate({scrollTop: 0}, 400)

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

  var scroll = 0,
      header = $('.pageheader'),
      headerHeight = header.innerHeight(),
      headerTitle = $('.pageheader-title'),
      pageTitle = $('.page-title'),
      pageTitleHeight = pageTitle.innerHeight(),
      pageTitlePos = pageTitle.offset().top
      
  $(window).on('scroll', function () {
    scroll = window.scrollY
    if (scroll > 0) {
      $('.pageheader').addClass('pageheader--scrolled')
    } else {
      $('.pageheader').removeClass('pageheader--scrolled')
    }

    if (scroll < (pageTitlePos + pageTitleHeight - headerHeight)) {
      headerTitle.addClass('pageheader-title--hidden');
    } else {
      headerTitle.removeClass('pageheader-title--hidden');
    }
  })

});
