define(

  [
    'underscore'
  ],

  function (_) {
    'use strict';

    var templates = {};
    var mapping = {
      column: 'template-column',
      columnHolder: 'template-column-holder',
      tweetItems: 'template-tweet-items'
    };

    _.each(mapping, function (value, key) {
      var tmpl = document.getElementById(value).textContent;
      templates[key] = _.template(tmpl);
    });

    return templates;
  }
);
