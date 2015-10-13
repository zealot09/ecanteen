define(['App', 'backbone', 'marionette', "views/user/MyAccountView"],
    function(App, Backbone, Marionette, View) {
        var control = Backbone.Marionette.Controller.extend({
            show: function(showSuccess) {
                var view = new View();
                view.on("login", function(info) {
                    var token = App.request("state:login", info);
                    token.done(function(response) {
                        if (response.status === "success") {
                            App.trigger("account");
                        }
                    });
                });
                if (showSuccess) {
                    view.on("show", function() {
                        view.$(".success").show();
                    });
                }
                App.accountView.mainRegion.show(view);
            }
        });
        return new control();
    });