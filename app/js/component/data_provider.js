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
    var timeout = -1;
    var buildStreamData = function buildStreamData(stream) {
      /*jshint camelcase:false */
      return {
        q: stream.query,
        since_id: stream.lastId,
        count: 10,
        result_type: 'mixed'
      };
    };

    this.pollSingle = function (stream, tag) {
      jQuery.ajax({
        url: config.API_ENDPOINT + '/search/tweets.json',
        type: 'get',
        data: buildStreamData(stream),
        headers: {
          'X-Requested-With': 'TweetDock v0.0.0',
          'Authorization': config.API_AUTHORIZATION
        }
      }).then(function (data) {
        this.onDataReceived(tag, data);
      }.bind(this)).always(function () {
        // Start the next timeout after the request ended.
        this.run();
      }.bind(this));
    };

    this.poll = function poll(tag) {
      _.each(streams, this.pollSingle.bind(this));
    };

    this.run = function run() {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(this.poll.bind(this), config.POLLING_INTERVAL);
    };

    this.onDataReceived = function (tag, data) {
      var stream = streams[tag];
      /*jshint camelcase:false */
      stream.lastId = data.search_metadata.max_id_str;

      console.log('Received data for tag ', tag);
      this.trigger('dataSearchStreamReceived', {
        tag: tag,
        results: data.statuses
      });
    };

    this.startSearchStream = function startSearchStream(ev, data) {
      // Override an existing stream if the tag is already in use.
      streams[data.tag] = {
        query: data.query,
        lastId: 0
      };

      this.pollSingle(streams[data.tag], data.tag);
      this.run();
    };

    this.after('initialize', function () {
      this.on('dataSearchStreamRequested', this.startSearchStream);
    });
  }

});
