define(['App', 'backbone', 'marionette', 'views/checkout/Checkout', 'controllers/checkout/LoginController', 'controllers/checkout/DeliveryController', 'controllers/checkout/PaymentController', 'controllers/checkout/ConfirmationController', 'entities/Checkout'],
    function(App, Backbone, Marionette, View, LoginController, DeliveryController, PaymentController, ConfirmationController) {
        var control = Backbone.Marionette.Controller.extend({
            show: function() {
                App.request("checkout:init");
                var view = new View();
                var loginView, deliveryView, paymentView, confirmView;
                App.checkoutView = view;
                view.on("show", function() {
                    loginView = LoginController.show();
                    confirmView = ConfirmationController.show();
                    deliveryView = DeliveryController.show();
                    paymentView = PaymentController.show();
                });
                view.on("closeall", function() {
                    loginView.disappear();
                    confirmView.disappear();
                    deliveryView.disappear();
                    paymentView.disappear();
                });
                view.on("show:confirm", function() {
                    confirmView.appear();
                });
                view.on("show:delivery", function() {
                    deliveryView.appear();
                });
                view.on("show:payment", function() {
                    paymentView.appear();
                });
                view.on("update:payment", function(info) {
                    paymentView.updatePayment(info);
                });
                App.mainRegion.show(view);
            }
        });

        return new control();
    });