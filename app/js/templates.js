define(

  [
    'handlebars'
  ],

  function (Handlebars) {
    'use strict';
    var column = document.getElementById('template-column').textContent;

    return {
      column: Handlebars.compile(column)
    };
  }

);
