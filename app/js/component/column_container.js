define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');
  var searchColumn = require('component/search_column');
  var templates = require('templates');

  /**
   * Module exports
   */

  return defineComponent(columnContainer);

  /**
   * Module function
   */

  function columnContainer() {
    this.defaultAttrs({
      boxSelector: '.td-scroll-box',
      columnClassName: 'td-column',
      queries: ['#kittens', '#bunnies', '#javascript', '#tweetdeck']
    });

    this._getRandomQuery = function () {
      return this.attr.queries[~~(Math.random() * this.attr.queries.length)];
    };

    this.addColumn = function () {
      var element = document.createElement('div');
      element.innerHTML = templates.columnHolder();
      var holder = element.querySelector('.td-column-holder');
      holder.classList.add('animate-flip-in');
      this.$box.append(holder);

      this._loadColumn(holder);
    };

    this._loadColumn = function (holder) {
      var element = document.createElement('div');
      element.classList.add(this.attr.columnClassName);
      holder.appendChild(element);
      searchColumn.attachTo(element, {
        query: this._getRandomQuery()
      });
    };

    this.removeColumn = function (ev, data) {
      // TODO: Clean up data provider binding!
      var target = ev.target.parentElement;
      // Tried transitionEnd, but the timing was way off. I was definitely doing
      // something wrong.
      window.setTimeout(function () {
        this.$box[0].removeChild(target);
      }.bind(this), 1000);
      target.classList.add('animate-flip-out');
    };

    this.after('initialize', function () {
      this.$box = this.select('boxSelector');
      this.on(document, 'uiAddColumnRequested', this.addColumn);
      this.on('uiRemoveColumnRequested', this.removeColumn);
    });
  }

});
