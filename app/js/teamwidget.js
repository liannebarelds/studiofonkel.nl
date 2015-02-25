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
      widget_width = $('.teamwidget').outerWidth(),
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

  // function detailsOnMember(item) {
  //   item.addClass('teamwidget-member-active')
  //   var thisPosition = item.offset()
  //   var axesPosition = $('.axes').offset()
  //   var translateString = 'translate(' + (axesPosition.left - thisPosition.left) + 'px, ' + (axesPosition.top - thisPosition.top) + 'px) translate(4vmin, 4vmin)'

  //   item.find('> .teamwidget-member-icon-wrapper').css({
  //     transform: translateString,
  //       MozTransform: translateString,
  //       WebkitTransform: translateString,
  //       msTransform: translateString
  //   })
  // }

  // Event handlers
  $('.teamwidget-select').on('change', function(e) {
    updateSelects()
    updatePositions()
  })

  // $('.teamwidget-members').on('click touch', '.teamwidget-member', function() {
  //   detailsOnMember($(this), false)
  // })

  $(window).resize(function() {
    updatePositions()
  })

  updatePositions()

});
