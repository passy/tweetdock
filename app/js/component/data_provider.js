define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');
  var config = require('config');
  var _ = require('underscore');

  /**
   * Module exports
   */

  return defineComponent(searchDataProvider);

  /**
   * Module function
   */

  function searchDataProvider() {
    this.defaultAttrs({
    });

    var streams = {};
    var running = false;
    var buildStreamData = function buildStreamData(stream) {
      /*jshint camelcase:false */
      return {
        q: stream.query,
        since_id: stream.lastId,
        count: 10,
        result_type: 'mixed'
      };
    };

    var poll = function poll() {
      _.each(streams, function (stream) {
        jQuery.ajax({
          url: config.API_ENDPOINT + '/search/tweets.json',
          type: 'get',
          data: buildStreamData(stream),
          headers: {
            'X-Requested-With': 'TweetDock v0.0.0',
            'Authorization': config.API_AUTHORIZATION
          }
        });
      });
      run();
    };

    var run = function start() {
      if (running) {
        window.setTimeout(poll.bind(this), config.POLLING_INTERVAL);
      }
    };

    this.startSearchStream = function startSearchStream(ev, data) { streams[data.tag] = {
        query: data.query,
        lastId: 0
      };

      running = !true;
      poll();
      run();
    };

    this.after('initialize', function () {
      this.on('dataSearchStreamRequested', this.startSearchStream);
    });
  }

});
