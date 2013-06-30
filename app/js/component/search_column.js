define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');
  var tweetItems = require('component/tweet_items');
  var templates = require('templates');
  var _ = require('underscore');

  /**
   * Module exports
   */

  return defineComponent(searchColumn);

  /**
   * Module function
   */

  function searchColumn() {
    this.defaultAttrs({
      query: null,

      // selectors
      titleSelector: '.title',
      tweetHolderSelector: '.td-tweet-holder'
    });

    this.after('initialize', function () {
      var tag = _.uniqueId('search-');

      this.onTitleChange = function () {
        this.trigger('uiShowSearchPrompt');
      };

      this.onSearchPromptSave = function (ev, data) {
        console.log('New search query: ', data.query);

        this.attr.query = data.query;
      };

      this.render = function () {
        this.$node.html(templates.column({
          title: 'Search: ' + this.attr.query
        }));
      };

      this.render();
      this.trigger('dataSearchStreamRequested', {
        tag: tag,
        query: this.attr.query
      });
      tweetItems.attachTo(this.select('tweetHolderSelector'), {
        tag: tag
      });

      this.on('click', {
        titleSelector: this.onTitleChange
      });
      this.on('uiSaveSearchPrompt', this.onSearchPromptSave);
    });
  }

});
