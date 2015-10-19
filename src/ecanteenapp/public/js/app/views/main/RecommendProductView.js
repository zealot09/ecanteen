define(['jquery', 'hbs!templates/mobile/recommendProduct', 'backbone', 'views/main/ProductItemView', 'marionette'],
  function($, template, Backbone, ItemView) {
    return Backbone.Marionette.CompositeView.extend({
        template: template,
        itemView: ItemView,
        itemViewContainer: ".recommendProduct",
        events: {
        },
        onMouseOver: function() {
        },
        onMouseLeave: function() {

        },
        onMouseLeaveFade: function() {
        },
        initialize: function() {
          console.log(this.collection);
        },
        itemViewOptions: function(model, index) {
          return {
            childIndex: index
          }
        }
    });
  });
