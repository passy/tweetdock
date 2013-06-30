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

  return defineComponent(searchColumn);

  /**
   * Module function
   */

  function searchColumn() {
    this.defaultAttrs({

    });

    this.after('initialize', function () {
      console.log('hello, world!');
      this.$node.html(templates.column({}));
    });
  }

});
