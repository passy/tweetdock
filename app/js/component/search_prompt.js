define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(searchPrompt);

  /**
   * Module function
   */

  function searchPrompt() {
    this.defaultAttrs({
      selector: '#td-search-modal',
      saveSelector: '#td-search-modal form',
      deleteSelector: '#td-search-modal .td-delete-btn'
    });

    // There can only be one search prompt at the time, so it's save
    // to keep a reference around.
    var origin;

    this.show = function show(ev) {
      this.$node.modal();
      origin = ev.target;
    };

    this.save = function save(ev) {
      ev.preventDefault();
      this.$node.modal('hide');

      var value = ev.target.querySelector('[name=query]').value;
      this.trigger(origin, 'uiSaveSearchPrompt', {
        query: value
      });
    };

    this.delete = function (ev) {
      ev.preventDefault();
      this.trigger(origin, 'uiColumnDeletionRequested');
    };

    this.after('initialize', function () {
      this.on(document, 'uiShowSearchPrompt', this.show);

      this.on('click', {
        deleteSelector: this.delete
      });
      this.on('submit', this.save);
    });
  }

});
