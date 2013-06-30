define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var searchColumn = require('component/search_column');
  var searchPrompt = require('component/search_prompt');
  var dataProvider = require('component/data_provider');

  /**
   * Module exports
   */

  return initialize;

  /**
   * Module function
   */

  function initialize() {
    dataProvider.attachTo(document);
    searchPrompt.attachTo('#td-search-modal');
    searchColumn.attachTo('#td-column-1', {
      query: '#yeoman'
    });
  }
});
