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

    var tweets = [{
      text: 'Hello Unicorn, flipping confetti lorem ipsum sparkling daisy dream.',
      user: { screen_name: 'passy' }
    }, {
      text: 'Fluffly unicorn snuffles across daisily sparkling cloudheavens.',
      user: { screen_name: 'sindresorhus' }
    }];

    this.render = function () {
      this.$node.html(templates.tweetItems({ tweets: '{{tweets}}' }));
      this.node.querySelector('template').model = { tweets: tweets };
      Platform.performMicrotaskCheckpoint();
    };

    this.onStreamData = function (results) {
      _.each(results, function (tweet) {
        tweets.unshift(tweet);
      });

      Platform.performMicrotaskCheckpoint();
    };

    this.after('initialize', function () {
      this.render();
      this.on(document, 'dataSearchStreamReceived', function (ev, data) {
        if (data.tag === this.attr.tag) {
          this.onStreamData(data.results);
        }
      });
    });
  }

});
