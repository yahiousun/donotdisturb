;(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(['jquery'], factory);
  } else {
      // Browser globals
      factory(jQuery);
  }
} (function ($, undefined) {
  'use strict';

  var Donotdisturb = function (element, options) {
    this.$element = $(element).is(document.body) ? $(window) : $(element);
    this.$irrelevant = $(options.selector);
    this.options = options;
    this.initialize();
  };

  Donotdisturb.prototype = {
    constructor: Donotdisturb,
    istyping: false,
    active: false,
    offset: 0,
    initialize: function () {
      var that = this;
      if (!that.$element.length) {
        return;
      }
      if (that.options.transition === true) {
        that.options.transition = $.fn.donotdisturb.options.transition;
      }
      if (that.options.transition && $.support.transition) {
        that.$irrelevant.addClass(that.options.transition);
      }
      if (that.options.scrollspy) {
        that.$element.on('scroll', function () {
          that.scrollspy();
        });
      }
      if (that.options.typingspy) {
        that.$element.on('focus.donotdisturb', 'input', function (event) {
          that.typingspy(event);
        });
        that.$element.on('blur.donotdisturb', 'input', function (event) {
          that.typingspy(event);
        });
      }
      that.offset = that.$element.scrollTop();
    },
    show: function () {
      var that = this;
      if (!that.active) {
        return;
      }
      that.$irrelevant = $(that.options.selector);
      if (!that.$irrelevant.length) {
        return;
      }
      that.$irrelevant.attr('aria-hidden', 'false').css('display', 'block');
      if (that.options.transition && $.support.transition) {
        that.$irrelevant[0].offsetWidth; // force reflow
        that.$irrelevant.off($.support.transition.end + '.donotdisturb').addClass(that.options.transition);
      }
      that.active = false;
    },
    hide: function () {
      var that = this;
      if (that.active) {
        return;
      }
      that.$irrelevant = $(that.options.selector);
      if (!that.$irrelevant.length) {
        return;
      }
      if (that.options.transition && $.support.transition) {
        that.$irrelevant.one($.support.transition.end + '.donotdisturb', function () {
          that.$irrelevant.attr('aria-hidden', 'true').css('display', 'none');
        });
        that.$irrelevant.removeClass(that.options.transition);
      } else {
        that.$irrelevant.attr('aria-hidden', 'true').css('display', 'none');
      }
      that.active = true;
    },
    scrollspy: function () {
      var that = this,
        delta = that.$element.scrollTop() - that.offset;
      that.offset = that.$element.scrollTop();
      if (that.istyping) {
        return;
      }
      if (delta < 0) {
        if (!that.istyping && that.active) {
          that.show();
        }
      } else if (delta > 0) {
        if (!that.active) {
          that.hide();
        }
      }
    },
    typingspy: function (event) {
      var that = this;
      if (event.type === 'focusin') {
        that.istyping = true;
        that.hide();
      } else if (event.type === 'focusout') {
        that.istyping = false;
        if (that.options.scrollspy) {
          if (!that.$element.scrollTop()) {
            that.show();
          }     
        } else {
          that.show();
        }
      }
    }
  };

  var methods = {
    initialize: function (options) {
      options = $.extend({}, $.fn.donotdisturb.options, options);
      return this.each(function () {
        if (!$(this).data('donotdisturb')) {
          $(this).data('donotdisturb', new Donotdisturb(this, options));
        }
      });
    },
    show: function () {
      return this.each(function () {
        var $this = $(this);
        if ($this.data('donotdisturb') instanceof Donotdisturb) {
          $this.data('donotdisturb').show();
        }
      });
    },
    hide: function () {
      return this.each(function () {
        var $this = $(this);
        if ($this.data('donotdisturb') instanceof Donotdisturb) {
          $this.data('donotdisturb').hide();
        }
      });
    }
  };

  $.fn.donotdisturb = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if(typeof method === 'object' || !method) {
      return methods.initialize.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.donotdisturb');
    }
  };

  // default options
  $.fn.donotdisturb.options = {
    selector: '[data-irrelevant="donotdisturb"]',
    scrollspy: true,
    typingspy: true,
    transition: 'in'
  };

  $(document).ready(function () {
    // data api
    $('[data-spy="donotdisturb"]').each(function () {
      var $spy = $(this);
      $spy.donotdisturb($spy.data());
    });
  });
}));