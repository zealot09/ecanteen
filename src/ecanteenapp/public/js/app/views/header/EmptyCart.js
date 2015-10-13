define(['jquery', 'hbs!templates/header/cart_empty', 'backbone', 'marionette'],
    function($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            id: "cart",
            template: template,
            initialize: function() {},
            events: {
                "mouseover": "onMouseOver",
                "mouseleave": "onMouseLeave"
            },
            ui: {
                content: ".content"
            },
            onMouseOver: function() {
                try {
                    this.ui.content.fadeIn();
                } catch (err) {

                }
            },
            onMouseLeave: function() {
                try {
                    this.ui.content.fadeOut();
                } catch (err) {

                }
            },
            collectionEvents: {
                "all": "onCollectionChange"
            },
            onCollectionChange: function() {
                this.trigger("cart:add");
            },
            onMouseLeaveFade: function() {
                this.ui.content.fadeOut();
            }
        });
    });