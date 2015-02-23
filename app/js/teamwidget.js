$(function() {
  'use strict'

  function updateSelects(axis) {
    if (axis == 'x') {
      $('#team_widget_selectY option').css('display', 'block')
      $('#team_widget_selectY option[value="'+ $('#team_widget_selectX option:selected')[0].value + '"]').css('display', 'none')
    }

    else {
      $('#team_widget_selectX option').css('display', 'block')
      $('#team_widget_selectX option[value="'+ $('#team_widget_selectY option:selected')[0].value + '"]').css('display', 'none')
    }
  }

  function updatePositions(characteristic, axis) {
    var other_axis
    axis == 'x' ? other_axis = 'y' : other_axis = 'x'
    var other_axis_characteristic = $('#team_widget_select' + other_axis.toUpperCase() + ' option:selected')[0].value,
        widget_width = $('.team_widget').outerWidth()

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
      console.log($('#team_member-member-' + key))

      $('#team_member-member-' + key).css({
        transform: translateString,
        MozTransform: translateString,
        WebkitTransform: translateString,
        msTransform: translateString
      })
    })
  }

  updateSelects('x')
  updateSelects('y')
  updatePositions($('#team_widget_selectY option:selected')[0].value, 'y')

  $('.team_widget').on('change', 'select', function(e) {
    var select_id = $(this).attr('id')
    var axis = select_id.charAt(select_id.length - 1).toLowerCase()
    updateSelects(axis)
    updatePositions($('#' + select_id + ' option:selected')[0].value, axis)
  })

});