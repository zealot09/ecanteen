define(['App', 'backbone', 'marionette', 'views/checkout/Login', 'entities/State'],
    function(App, Backbone, Marionette, View) {
        var control = Backbone.Marionette.Controller.extend({
            show: function() {
                var view = new View();
                var isLogged = App.request("state:isLoggedIn");
                view.on("show", function() {
                    if (isLogged.get("id")) {
                        view.ui.heading.text("Step 1: Logged In.");
                    } else {
                        view.appear();
                    }
                });
                view.on("login", function(data) {
                    var loginPromise = App.request("state:login", data);
                    loginPromise.done(function(response) {
                        view.$(".error").fadeOut();
                        if (response.status === "success") {
                            view.trigger("continue");
                            view.ui.heading.text("Step 1: Logged In.");
                        } else {
                            view.showWarning();
                        }
                    });
                });
                view.on("continue", function() {
                    view.disappear();
                    App.checkoutView.trigger("show:delivery");
                });
                view.on("closeothers", function() {
                    App.checkoutView.trigger("closeall");
                });
                App.checkoutView.checkoutRegion.show(view);
                return view;
            }
        });
        return new control();
    });