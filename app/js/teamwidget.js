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

  function update() {
    if ($('.teamwidget').length) {
      updateSelects()
      updatePositions()
      updateLabels()
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
});
