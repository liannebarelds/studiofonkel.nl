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

});
