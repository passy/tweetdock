define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(addColumnBtn);

  /**
   * Module function
   */

  function addColumnBtn() {
    this.defaultAttrs({

    });

    this.fire = function () {
      this.trigger('uiAddColumnRequested');
    };

    this.after('initialize', function () {
      this.on('click', this.fire);

    });
  }

});
