// cart should reload a different template when cleared
// cart should reload its contents when items total price changed
define(['App', 'backbone', 'marionette', "views/header/Cart", "views/header/EmptyCart", "entities/Cart", "entities/State"],
    function(App, Backbone, Marionette, View, EmptyView) {
        var control = Backbone.Marionette.Controller.extend({
            show: function(visible) {
                var cart = App.request("cart:current");
                var cart_items = cart.get('children');
                var view;
                var that = this;
                if (cart_items.length > 0) {
                    view = new View({
                        model: cart,
                        collection: cart_items
                    });
                    view.on("cart:clear", function() {
                        App.request("cart:clear");
                        view.off();
                        view.close();
                        that.show(true);
                    });
                    view.on("itemview:cart:setCount", function(itemView, model, count) {
                        App.request("cart:setCount", model, count);
                        view.off();
                        view.close();
                        that.show(true);
                    });
                    view.on("empty", function() {
                        view.off();
                        view.close();
                        that.show(true);
                    });

                    view.on("checkout", function() {
                        var sid = App.request("state:storeid");
                        App.trigger("checkout", sid);
                    });
                } else {
                    view = new EmptyView({
                        collection: cart_items
                    });
                    view.on("cart:add", function() {
                        view.off();
                        view.close();
                        that.show(true);
                    });
                }
                cart.on("change:totalPrice", function() {
                    cart.off();
                    that.show();
                });
                view.on("show", function() {
                    view.onMouseOver();
                    setTimeout(function() {
                        view.onMouseLeave();
                    }, 800);
                });
                App.headerLayout.cartRegion.show(view);
            }
        });
        return new control();
    });