$(function() {
 'use strict'

 var dontRemove = false
  var previousUrl = sessionStorage.getItem('previous-url')
  var currentPageUrl = window.location.pathname
  sessionStorage.setItem('previous-url', currentPageUrl)

  if (previousUrl != '/') {
    $('body').removeClass('has-loading-state')
  }

  if (previousUrl.substr(0, 7) == '/cases/' && previousUrl.length > 7 && currentPageUrl != previousUrl && currentPageUrl == '/cases/') {
    dontRemove = true
    var that = $('.case--teaser[href="' + previousUrl + '"]')
    $(that).addClass('active')
    $('body').addClass('has-loading-state').addClass('has-case-loading-state')

    var clone = $(that)[0].outerHTML

    var offset = $(that).offset()
    var width = $(that).outerWidth()
    var height = $(that).outerHeight()

    $('body').append(clone)

    var clonedItem = $('body > .case--teaser')

    var goToLeft = $('.casesoverview').offset().left
    var goToWidth = $('.casesoverview').outerWidth()

    clonedItem.css({
      width: goToWidth,
      left: goToLeft,
      top: '120px',
      height: '308px'
    })

    setTimeout(function () {
      $('body').removeClass('has-loading-state')

      clonedItem.animate({
        top: offset.top - $(window).scrollTop(),
        left: offset.left,
        bottom: 'auto',
        right: 'auto',
        width: width,
        height: height
      }, function () {
        clonedItem.remove()
        $('.case--teaser.active').removeClass('active')
        $('body').removeClass('case-full-transition').removeClass('has-case-loading-state')
      })
    }, 600)
  }

  if (!dontRemove) {
    setTimeout(function () {
      $('body').removeClass('has-loading-state').removeClass('has-case-loading-state')
      initTitle()
    }, 300)

    setTimeout(function () {
      $('body').removeClass('case-full-transition')
      initTitle()
    }, 2000)
  }

  // TODO contains bug on case full.
  // Shows empty page.
  $('.menubutton, .pageheader .logo-link, body:not(.front) .logo-link').on('click', function () {
    var that = this
    $('body').addClass('has-loading-state')
    $('.menubutton').removeClass().addClass('menubutton').addClass('menubutton--active')

    $('.menubutton').one('transitionend', function () {
      setTimeout(function () {
        window.location = $(that).attr('href')
      }, 200)
    })

    return false
  })

  $('.scroll-to-top, .front .logo-link').on('click', function () {
    $('body,html').animate({scrollTop: 0 }, 400)
    return false
  })

  $('.closebutton').on('click', function () {
    var that = this
    $('body,html').animate({scrollTop: 0 }, 400)
    $('body').addClass('case-full-transition')

    setTimeout(function () {
      $('body').addClass('has-case-loading-state')

      $('.page-introduction').one('transitionend', function () {
        setTimeout(function () {
          window.location = $(that).attr('href')
        }, 400)
      })
    }, 100)

    return false
  })

  $('.frontpage-item-link.contact').on('click', function () {
    $('body,html').animate({scrollTop: $(window).height()}, 400)
    return false
  })

  $('.overview a').on('click', function () {

    var that = this
    $(this).addClass('active')
    $('body').addClass('has-loading-state').addClass('has-case-loading-state')

    var clone = $(this)[0].outerHTML

    var offset = $(this).offset()
    var width = $(this).outerWidth()
    var height = $(this).outerHeight()
    $('body').append(clone)

    var clonedItem = $('body > .case--teaser')

    clonedItem.css({
      top: offset.top - $(window).scrollTop(),
      left: offset.left,
      bottom: 'auto',
      right: 'auto',
      width: width,
      height: height
    })

    var goToLeft = $('.casesoverview').offset().left
    var goToWidth = $('.casesoverview').outerWidth()

    clonedItem.animate({
      width: goToWidth,
      left: goToLeft,
      top: '120px',
      height: '308px'
    }, function () {
      window.location = $(that).attr('href')
    })

    return false
  })


  $('.frontpage-item-link:not(.contact)').on('click', function () {
    $('body,html').animate({scrollTop: 0}, 400)

    var that = this
    // Prevent multiple clicks.
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
      pageTitle = $('.page-title')

  var pageTitleHeight,
    pageTitlePos,
    header,
    headerHeight,
    headerTitle

  function initTitle() {
    if ($('.page-title').length) {
      pageTitleHeight = pageTitle.innerHeight()
      pageTitlePos = pageTitle.offset().top
      header = $('.pageheader')
      headerHeight = header.innerHeight()
      headerTitle = $('.pageheader-title')
    }
  }

  var updateDelay;
  $(window).resize(function() {
    clearTimeout(updateDelay);
    updateDelay = setTimeout(
      function() {
        if (pageTitle.length) {
          pageTitleHeight = pageTitle.innerHeight(),
          pageTitlePos = pageTitle.offset().top,
          headerHeight = header.innerHeight()
        }

        scrollFunction()
      }, 100)
  })

  var scrollFunction = function() {
    if (pageTitle.length) {
    scroll = window.scrollY
    var pagefooterTop = $('.pagefooter').offset().top - 80
      if (scroll > 0) {
        $('.pageheader').addClass('pageheader--scrolled')
      } else {
        $('.pageheader').removeClass('pageheader--scrolled')
      }

      if (scroll > pagefooterTop) {
        $('body').addClass('has-scrolled-to-contact')
      }
      else {
        $('body').removeClass('has-scrolled-to-contact')
      }

      if (scroll < (pageTitlePos + pageTitleHeight - headerHeight)) {
        headerTitle.removeClass('pageheader-title--shown')
      } else {
        headerTitle.addClass('pageheader-title--shown')
      }
    }
  }

  $(window).on('scroll', function () {
    scrollFunction()
  })

  initTitle()

});
