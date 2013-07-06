define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var searchColumn = require('component/search_column');
  var searchPrompt = require('component/search_prompt');
  var dataProvider = require('component/data_provider');
  var addColumnBtn = require('component/add_column_btn');
  var columnContainer = require('component/column_container');

  /**
   * Module exports
   */

  return initialize;

  /**
   * Module function
   */

  function initialize() {
    dataProvider.attachTo(document);
    columnContainer.attachTo('#td-column-container');
    searchPrompt.attachTo('#td-search-modal');
    searchColumn.attachTo('#td-column-1', {
      query: '#yeoman'
    });
    searchColumn.attachTo('#td-column-2', {
      query: '#prism'
    });
    addColumnBtn.attachTo('#td-add-column-btn');
  }
});
