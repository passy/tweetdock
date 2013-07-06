define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');
  var templates = require('templates');

  /**
   * Module exports
   */

  return defineComponent(columnContainer);

  /**
   * Module function
   */

  function columnContainer() {
    this.defaultAttrs({

    });

    this.after('initialize', function () {

    });
  }

});
