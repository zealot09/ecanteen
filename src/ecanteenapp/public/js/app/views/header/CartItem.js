define(['jquery', 'hbs!templates/header/cart_item', 'backbone', 'marionette'],
    function($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            tagName: "tr",
            template: template,
            events: {
                "click .name a": "onProductDetail",
                "click .image a": "onProductDetail",
                "click .remove-link": "onRemove",
                "blur .qty-input": "onChangeCount"
            },
            modelEvents: {
                "change:count": "countChanged"
            },
            onRemove: function(e) {
                e.preventDefault();
                this.model.collection.remove(this.model);
                this.close();
            },
            onProductDetail: function(e) {
                e.preventDefault();
//                console.log("Product Details.");
            },
            countChanged: function() {
                this.render();
            },
            onChangeCount: function(e) {
                e.preventDefault();
                var count = parseInt(this.$('.qty-input').val(), 10);
                if (count <= 0) {
                    $.notify("Wrong Quantity.", {
                        position: "right bottom",
                        className: 'success'
                    });
                    return;
                }
                this.trigger("cart:setCount", this.model, count);
            },
            initialize: function() {}
        });
    });
