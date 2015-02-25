
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

          this.scrollImageHeight = $(this.element).innerHeight()
          this.image = $('img', this.element)
          this.ticking = false

          this.scrollImageMin = $(this.element).offset().top
          this.scrollImageMax = this.scrollImageMin + this.scrollImageHeight
          this.windowHeight = window.innerHeight

          $(window).on('scroll', function () {
            if (that.ticking === false) {
              that.ticking = true
              requestAnimationFrame(function () {
                that.scroll(that)
              })
            }
          })

          that.scroll(that)
        },

        scroll: function(that) {
          if (!that.imageHeight) {
            that.imageHeight = that.image.innerHeight()
          }

          var scrollPercentage = (window.scrollY - (that.scrollImageMin - that.windowHeight)) / (that.scrollImageMax - (that.scrollImageMin - that.windowHeight))

          if (that.scrollImageMax > window.scrollY && that.scrollImageMin < (that.windowHeight + window.scrollY)) {
            var translateY = Math.floor((that.imageHeight + that.scrollImageHeight) * scrollPercentage * -1 / 2)
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
