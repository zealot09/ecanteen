define(['jquery', 'hbs!templates/header/cart', 'backbone', 'views/header/CartItem', 'marionette', 'entities/Category'],
    function($, template, Backbone, ItemView) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.CompositeView.extend({
            id: "cart",
            template: template,
            itemView: ItemView,
            itemViewContainer: ".mini-cart-info tbody",
            ui: {
                content: ".content"
            },
            events: {
                "mouseover": "onMouseOver",
                "click": "onMouseOver",
                "mouseleave": "onMouseLeave",
                "click .js-clear-cart": "onClearCart",
                "click .js-checkout": "onCheckout"
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
            onClearCart: function(e) {
                this.trigger("cart:clear");
            },
            onCheckout: function(e) {
                this.trigger("checkout");
                // this.close();
            },
            modelEvents: {
                "change:totalPrice": "onChangeTotalPrice",
                "meow": "onMeow"
            },
            collectionEvents: {
                "all": "onCollectionChange"
            },
            onMeow: function() {
                console.log("meow");
            },
            onChangeTotalPrice: function() {
                this.render();
            },
            onCollectionChange: function() {
                if (this.collection.length === 0) {
                    this.trigger("empty");
                } else {
                    this.calculateTotal();
                }
                this.model.save();
            },
            initialize: function() {
                var that = this;
                this.on("itemview:cart:setCount", function(itemView, model, count){
                    this.trigger("cart:setCount", model, count);
                });
                this.calculateTotal();
            },
            calculateTotal: function() {
                var subtotal = 0;
                var totalTax = 0;
                this.collection.forEach(function(item) {
                    var itemsubtotal = parseFloat(item.get("totalPrice")),
                        tr = parseFloat(item.get("taxRate"));
                    subtotal += itemsubtotal;
                    totalTax += itemsubtotal * tr / 100;
                });
                var total = subtotal + totalTax;
                this.model.set({
                    totalTax: totalTax.toFixed(2),
                    subtotalPrice: subtotal.toFixed(2),
                    totalPrice: (subtotal + totalTax).toFixed(2)
                });
            }
        });
    });