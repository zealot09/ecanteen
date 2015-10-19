define(['jquery', 'hbs!templates/mobile/productItem', 'backbone', 'marionette'],
  function($, template, Backbone) {
    return Backbone.Marionette.ItemView.extend({
      tagName: 'div',
      className: 'itemBox ',
      template: template,
      initialize: function (options) {
        this.model.childIndex = options.childIndex;
      }
    });
  });
