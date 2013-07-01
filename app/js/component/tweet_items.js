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

    var tweets = [];
    var MAX_TWEETS = 30;

    this.render = function () {
      this.$node.html(templates.tweetItems());
      this.node.querySelector('template').model = { tweets: tweets };
      Platform.performMicrotaskCheckpoint();
    };

    this.onStreamData = function (results) {
      _.each(results, function (tweet) {
        tweets.unshift(tweet);
      });
      // Setting the maximum after everything has been added.
      tweets.splice(MAX_TWEETS);

      Platform.performMicrotaskCheckpoint();
    };

    this.after('initialize', function () {
      this.render();
      this.on(document, 'dataSearchStreamReceived', function (ev, data) {
        console.log('Tag received: ', data.tag, 'Own tag: ', this.attr.tag);
        if (data.tag === this.attr.tag) {
          this.onStreamData(data.results);
        }
      });
    });
  }

});
