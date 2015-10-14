define(['jquery', 'hbs!templates/mobile/recommendProduct', 'backbone', 'views/header/ProductItem', 'marionette'],
  function($, template, Backbone, ItemView) {
    return Backbone.Marionette.CompositeView.extend({
        id: "recommendProduct",
        template: template,
        itemView: ItemView,
        itemViewContainer: "",
        ui: {
            content: ".content"
        },
        events: {
        },
        onMouseOver: function() {
            try {
                this.ui.content.stop(true, true).fadeIn();
            } catch (err) {

            }
        },
        onMouseLeave: function() {
            try {
                this.ui.content.fadeOut();
            } catch (err) {

            }
        },
        onMouseLeaveFade: function() {
            this.ui.content.fadeOut();
        },
        initialize: function() {
        },
    });
  });
