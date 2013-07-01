define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');
  var templates = require('templates');
  var _ = require('underscore');

  /**
   * Module exports
   */

  return defineComponent(tweetItems);

  /**
   * Module function
   */

  function tweetItems() {
    this.defaultAttrs({
      tag: null
    });

    var MAX_TWEETS = 30;

    this.render = function () {
      this.$node.html(templates.tweetItems());
      this.node.querySelector('template').model = { tweets: this.tweets };
      Platform.performMicrotaskCheckpoint();
    };

    this.onStreamData = function (results) {
      _.each(results, function (tweet) {
        this.tweets.unshift(tweet);
      }.bind(this));
      // Setting the maximum after everything has been added.
      this.tweets.splice(MAX_TWEETS);

      Platform.performMicrotaskCheckpoint();
    };

    this.after('initialize', function () {
      this.tweets = [];

      this.render();
      this.on(document, 'dataSearchStreamReceived', function (ev, data) {
        if (data.tag === this.attr.tag) {
          this.onStreamData(data.results);
        }
      });
    });
  }

});
