define(

  [
    'handlebars',
    'underscore'
  ],

  function (Handlebars, _) {
    'use strict';

    var templates = {};
    var mapping = {
      column: 'template-column',
      tweetItems: 'template-tweet-items'
    };

    _.each(mapping, function (value, key) {
      var tmpl = document.getElementById(value).textContent;
      templates[key] = Handlebars.compile(tmpl);
    });

    return templates;
  }
);
