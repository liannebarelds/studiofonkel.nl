$(function() {
  'use strict'

  function updateSelects(axis) {
    if (axis == 'x') {
      $('#teamwidget-selectY option').css('display', 'block')
      $('#teamwidget-selectY option[value="'+ $('#teamwidget-selectX option:selected')[0].value + '"]').css('display', 'none')
    }

    else {
      $('#teamwidget-selectX option').css('display', 'block')
      $('#teamwidget-selectX option[value="'+ $('#teamwidget-selectY option:selected')[0].value + '"]').css('display', 'none')
    }
  }

  function updatePositions(characteristic, axis) {
    console.log('hahaha')
    var other_axis
    axis == 'x' ? other_axis = 'y' : other_axis = 'x'
    var other_axis_characteristic = $('#teamwidget-select' + other_axis.toUpperCase() + ' option:selected')[0].value,
        widget_width = $('.teamwidget').outerWidth()

    $.each(window.teaminfo, function(i, object) {
      var key = object.key,
          this_axis_value = object.preferences[characteristic],
          other_axis_value = object.preferences[other_axis_characteristic],
          translateString

      if (axis == 'x') {
        translateString = 'translate(' + (this_axis_value * widget_width / 100) + 'px, ' + (other_axis_value * widget_width / 100) + 'px)'
      }

      else {
        translateString = 'translate(' + (other_axis_value * widget_width / 100) + 'px, ' + (this_axis_value * widget_width / 100) + 'px)'
      }

      $('#teamwidget-member-member-' + key).css({
        transform: translateString,
        MozTransform: translateString,
        WebkitTransform: translateString,
        msTransform: translateString
      })
    })
  }

  updateSelects('x')
  updateSelects('y')
  updatePositions($('#teamwidget-selectY option:selected')[0].value, 'y')

  // Event handlers
  $('.teamwidget').on('change', 'select', function(e) {
    var select_id = $(this).attr('id')
    var axis = select_id.charAt(select_id.length - 1).toLowerCase()
    updateSelects(axis)
    updatePositions($('#' + select_id + ' option:selected')[0].value, axis)
  })

  $('.teamwidget-members').on('click touch', '.teamwidget-member', function() {
    $(this).addClass('teamwidget-member-active')
  })

  var timeout
  $(window).resize(function() {
    clearTimeout(timeout)
    timeout = setTimeout(function(){
      updatePositions($('#teamwidget-selectX option:selected')[0].value, 'x')
    }, 400)
  })

});
