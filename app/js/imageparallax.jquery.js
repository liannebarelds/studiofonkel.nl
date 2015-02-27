;(function ( $, window, document, undefined ) {

  // Create the defaults once
  var pluginName = "imageparallax"

  // The actual plugin constructor
  function Plugin( element, options ) {
    this.element = element;
    this._name = pluginName;

    this.init()
  }

  Plugin.prototype = {

    init: function() {
      var that = this
      that.updateDelay;
      that.element = $('.image-inner', that.element)
      that.image = $('img', that.element)
      that.ticking = false
      that.update(that)

      $(window).on('scroll', function () {
        if (that.ticking === false) {
          that.ticking = true
          requestAnimationFrame(function () {
            that.scroll(that)
          })
        }
      })

      $(window).resize(function() {
        clearTimeout(that.updateDelay);
        that.updateDelay = setTimeout(
          function() {
            that.update(that)
            that.scroll(that)
          }, 100);
      })

      setTimeout(function () {
        that.update(that)
        that.scroll(that)
      }, 1000)

    },

    update: function(that) {
      $(that.element).innerHeight($(that.element).innerWidth()*0.5625)
      that.windowHeight = window.innerHeight
      that.offsetTop = that.windowHeight / 2
      that.offsetBottom = that.windowHeight / 2
      that.scrollImageHeight = $(that.element).innerHeight()
      that.scrollImageMin = $(that.element).offset().top + that.offsetTop
      that.scrollImageMax = that.scrollImageMin + that.scrollImageHeight
      that.imageHeight = that.image.innerHeight()
    },

    scroll: function(that) {
      var scrollPercentage = (window.scrollY - (that.scrollImageMin - that.windowHeight)) / (that.scrollImageMax - (that.scrollImageMin - that.windowHeight))

      if (that.scrollImageMax > window.scrollY && that.scrollImageMin < (that.windowHeight + window.scrollY)) {
        var translateY = Math.floor((that.imageHeight - that.scrollImageHeight) * scrollPercentage * -1)
        that.image.css( "transform", "translate(0, " + translateY + "px)" );

        console.log('--AAN--');
      }
      console.log('---------');
      console.log('that.scrollImageMax: ' + that.scrollImageMax);
      console.log('that.scrollImageMin: ' + that.scrollImageMin);
      console.log('that.windowHeight: ' + that.windowHeight);
      console.log('that.imageHeight: ' + that.imageHeight);
      console.log('that.scrollImageHeight: ' + that.scrollImageHeight);
      console.log('scrollPercentage: ' + scrollPercentage);
      console.log('window.scrollY: ' + window.scrollY);

      that.ticking = false
    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName,
        new Plugin( this, options ));
      }
    });
  };

})( jQuery, window, document );
