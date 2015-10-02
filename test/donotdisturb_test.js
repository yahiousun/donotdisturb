(function ($) {
  'use strict';
  module('jQuery#donotdisturb', {
    setup: function () {
      this.elems = $('#donotdisturb-test');
      this.input = $('#donotdisturb-test-input');
    }
  });

  test('is chainable', function () {
    expect(1);
    strictEqual(this.elems.donotdisturb({ transition: false}), this.elems, 'should be chainable');
  });

  test('is typingspy work', function () {
    expect(3);
    this.elems.donotdisturb({ transition: false});
    this.input.trigger('focus');
    strictEqual(this.elems.data('donotdisturb').active, true, 'focus work');
    this.input.trigger('blur');
    strictEqual(this.elems.data('donotdisturb').active, false, 'blur work');
    this.input.trigger('focus');
    this.elems.scrollTop(100).trigger('scroll');
    this.input.trigger('blur');
    strictEqual(this.elems.data('donotdisturb').active, true, 'disable show work');
  });

  test('is scrollspy work', function () {
    expect(5);
    this.elems.donotdisturb({ transition: false});
    this.elems.scrollTop(100).trigger('scroll');
    strictEqual(this.elems.data('donotdisturb').active, true, 'scroll down work');

    this.elems.scrollTop(0).trigger('scroll');
    strictEqual(this.elems.data('donotdisturb').active, false, 'scroll up work');

    this.input.trigger('focus');
    strictEqual(this.elems.data('donotdisturb').active, true, 'focus work');

    this.elems.scrollTop(100).trigger('scroll');
    strictEqual(this.elems.data('donotdisturb').active, true, 'disable scroll down work');

    this.elems.scrollTop(0).trigger('scroll');
    strictEqual(this.elems.data('donotdisturb').active, true, 'disable scroll up work');
  });

}(jQuery));
