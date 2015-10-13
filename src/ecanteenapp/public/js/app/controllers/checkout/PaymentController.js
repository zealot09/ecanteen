define(['App', 'backbone', 'marionette', 'views/checkout/Payment', 'entities/Cart', 'entities/State'],
    function(App, Backbone, Marionette, View) {
        var control = Backbone.Marionette.Controller.extend({
            show: function() {
                var model = new Backbone.Model();
                var view = new View({
                    model: model
                });
                view.on("closeothers", function() {
                    App.checkoutView.trigger("closeall");
                });
                view.on("success", function(tf) {
                    App.request("cart:clear");
                    App.request("state:userfetch");
                    if (tf) {
                        location.href = "#";
                    }
                });
                App.checkoutView.paymentRegion.show(view);
                return view;
            }
        });
        return new control();
    });