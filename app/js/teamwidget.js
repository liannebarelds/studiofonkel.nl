$(function() {
  'use strict'

  function updateSelects() {
    $('.teamwidget-select option').css('display', 'block')

    var xValue = $('#teamwidget-selectX option:selected').val()
    var yValue = $('#teamwidget-selectY option:selected').val()

    $('#teamwidget-selectY option[value="'+ xValue + '"]').css('display', 'none')
    $('#teamwidget-selectX option[value="'+ yValue + '"]').css('display', 'none')
  }

  function updatePositions() {
    $.each(window.teaminfo, function(delta, object) {
      var selected = [],
      widget_width = $('.teamwidget').width(),
      key = object.key

      $.each($('.teamwidget-select option:selected'), function (selectDelta, select) {
        selected[selectDelta] = object.preferences[$(select).val()]
      })

      var translateString = 'translate(' + (selected[0] * widget_width / 100) + 'px, ' + (selected[1] * widget_width / 100) + 'px)'

      $('#teamwidget-member-member-' + key).css({
        transform: translateString,
        MozTransform: translateString,
        WebkitTransform: translateString,
        msTransform: translateString
      })
    })
  }

  function updateLabels() {
    var changingAxis
    var textsX = $('#teamwidget-selectX option:selected').val().split(' vs. ')
    var textsY = $('#teamwidget-selectY option:selected').val().split(' vs. ')

    if ($('.axis-label.left').html() == textsX[0]) {
      changingAxis = 'y'
    }
    else {
      changingAxis = 'x'
    }

    $('body').addClass('has-updating-teamwidget-' + changingAxis)

    setTimeout(function () {
      $('.axis-label.top').html(textsY[0])
      $('.axis-label.bottom').html(textsY[1])

      $('.axis-label.left').html(textsX[0])
      $('.axis-label.right').html(textsX[1])
      $('body').removeClass('has-updating-teamwidget-' + changingAxis)
    }, 200)

  }

  function updateTexts() {
    $('.teamwidget-text--active').removeClass('teamwidget-text--active')

    var xValue = $('#teamwidget-selectX option:selected').val()
    var yValue = $('#teamwidget-selectY option:selected').val()

    $('.teamwidget-controls-inner .x .teamwidget-text[data-id="' + xValue + '"]').addClass('teamwidget-text--active')
    $('.teamwidget-controls-inner .y .teamwidget-text[data-id="' + yValue + '"]').addClass('teamwidget-text--active')
  }

  function update() {
    if ($('.teamwidget').length) {
      updateSelects()
      updatePositions()
      updateLabels()
      updateTexts()
    }
  }

  $(window).on('scroll', function () {
    if ($('.teamwidget').length) {
      var top = $('.teamwidget').offset().top - $('.teamwidget').outerHeight()
      var bottom = top + $('.teamwidget').height() - 81

      if ($(window).scrollTop() > top && $(window).scrollTop() < bottom) {
        $('body').addClass('has-visible-teamwidget')
        $('body').removeClass('is-above-teamwidget')
        $('body').removeClass('is-below-teamwidget')
      }
      else if ($(window).scrollTop() < top) {
        $('body').addClass('is-above-teamwidget')
        $('body').removeClass('is-below-teamwidget')
        $('body').removeClass('has-visible-teamwidget')
      }
      else {
        $('body').addClass('is-below-teamwidget')
        $('body').removeClass('has-visible-teamwidget')
        $('body').removeClass('is-above-teamwidget')
      }
    }
  })

  // Event handlers
  $('.teamwidget-select').on('change', function(e) {
    update()
  })

  $(window).resize(function() {
    update()
  })

  update()
  $(window).scroll()

  $('.teamwidget-member').on('click', function () {
    var clonedHtml = $(this)[0].outerHTML
    $('body').append(clonedHtml)

    var oldOffset = $(this).offset()
    var oldWidth = $(this).outerWidth()
    var oldHeight = $(this).outerHeight()

    var clonedItem = $('body > .teamwidget-member')
    clonedItem.attr('style', '')
    var translateString = 'translate(' + (oldOffset.left + 30) + 'px,' + (oldOffset.top - $(window).scrollTop() + 30) + 'px)'

    $('.teamwidget-member .closebutton').on('click', function () {
      // TODO first add class to close the circle than proceed.
      $(this).parents('.teamwidget-member').removeClass('open')

      var translateString = 'translate(' + (oldOffset.left + 30) + 'px,' + (oldOffset.top - $(window).scrollTop() + 30) + 'px)'

      $('.teamwidget-member-info', clonedItem).remove()

      clonedItem.css({
        width: '1px',
        height: '1px',
        top: '-30px',
        left: '-30px',
        transform: translateString,
        MozTransform: translateString,
        WebkitTransform: translateString,
        msTransform: translateString
      })

      clonedItem.one('transitionend', function() {
        setTimeout(function () {
          clonedItem.remove()
          $('body').removeClass('has-expanded-team-member')
        }, 400)
      })

      return false
    })


    clonedItem.css({
      width: oldWidth,
      height: oldHeight,
      transform: translateString,
      MozTransform: translateString,
      WebkitTransform: translateString,
      msTransform: translateString
    })

    var translateString = 'translate(-50%, -50%)'
    setTimeout(function () {
      clonedItem.addClass('clone')

      setTimeout(function () {
        clonedItem.addClass('open')

        $('body').addClass('has-expanded-team-member')

        clonedItem.css({
          left: '50%',
          top: '50%',
          transform: translateString,
          MozTransform: translateString,
          WebkitTransform: translateString,
          msTransform: translateString,
        })
      }, 200)
    }, 200)


  })

});
