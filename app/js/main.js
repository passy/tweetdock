/* global DEBUG */
'use strict';

requirejs.config({
  baseUrl: '',
  paths: {
    flight: 'bower_components/flight',
    handlebars: 'bower_components/handlebars/handlebars',
    component: 'js/component',
    page: 'js/page',
    templates: 'js/templates'
  },
  shim: {
    handlebars: {
      exports: 'Handlebars'
    }
  }
});

require(
  [
    'flight/lib/compose',
    'flight/lib/registry',
    'flight/lib/advice',
    'flight/lib/logger',
    'flight/tools/debug/debug'
  ],

  function(compose, registry, advice, withLogging, debug) {
    debug.enable(true);
    DEBUG.events.logAll();
    compose.mixin(registry, [advice.withAdvice, withLogging]);

    require(['page/default'], function(initializeDefault) {
      initializeDefault();
    });
  }
);
