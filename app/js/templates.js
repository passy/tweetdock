define(

  [
    'underscore'
  ],

  function (_) {
    'use strict';

    var templates = {};
    var mapping = {
      column: 'template-column',
      tweetItems: 'template-tweet-items'
    };

    _.each(mapping, function (value, key) {
      templates[key] = document.getElementById(value);
    });

    return templates;
  }
);
