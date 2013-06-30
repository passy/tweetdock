define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var searchColumn = require('component/search_column');

  /**
   * Module exports
   */

  return initialize;

  /**
   * Module function
   */

  function initialize() {
    searchColumn.attachTo('#td-column-1', {
      term: '#yeoman'
    });
  }
});
