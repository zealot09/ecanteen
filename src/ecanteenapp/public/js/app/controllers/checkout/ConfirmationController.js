define(['App', 'backbone', 'marionette', 'views/checkout/Confirm', 'entities/Cart', 'entities/State'],
    function(App, Backbone, Marionette, View) {
        var control = Backbone.Marionette.Controller.extend({
            show: function() {
                var cart = App.request("cart:current");
                var items = cart.get('children');

                var view = new View({
                    model: cart,
                    collection: items
                });
                view.on("closeothers", function() {
                    App.checkoutView.trigger("closeall");
                });

                view.on("gift", function() {
                    App.request("checkout:addGift");
                });

                view.on("continue", function() {
                    App.request("checkout:confirm").done(function(response) {
                        if (response.status === "success") {
                            view.disappear();
                            App.checkoutView.trigger("update:payment", response);
                        } else {
                            view.showWarning();
                        }
                    });
                });

                App.checkoutView.confirmRegion.show(view);
                return view;
            }
        });
        return new control();
    });