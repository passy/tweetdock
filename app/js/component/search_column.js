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

    this.onTitleChangeRequested = function () {
      this.trigger('uiShowSearchPrompt');
    };

    this.onSearchPromptSave = function (ev, data) {
      console.log('New search query: ', data.query);

      this.attr.query = data.query;
      this.update();
    };

    this.onRemove = function (ev, data) {
      ev.stopPropagation();
      this.teardown();
      // Reraise with tag annotation
      this.trigger('uiRemoveColumnRequested', { tag: this.attr.tag });
    };

    this.render = function () {
      this.node.innerHTML = templates.column();
      // Not very pretty ...
      this.select('titleSelector')[0].childNodes[0].bind(
        'textContent', this.model, 'title');
      this.update();
    };

    this.update = function () {
      this.model.title = 'Search: ' + this.attr.query;
      console.log('Model for', this.node, ':', this.model);
      this.requestStream();
      Platform.performMicrotaskCheckpoint();
    };

    this.after('initialize', function () {
      this.tag = _.uniqueId('search-');
      this.model = {};

      this.requestStream = function () {
        this.trigger('dataSearchStreamRequested', {
          tag: this.tag,
          query: this.attr.query
        });
      };
      this.render();

      this.on('click', {
        titleSelector: this.onTitleChangeRequested
      });

      this.on('uiSaveSearchPrompt', this.onSearchPromptSave);
      this.on('uiRemoveColumnRequested', this.onRemove);
      tweetItems.attachTo(this.select('tweetHolderSelector'), {
        tag: this.tag
      });
    });
  }

});
