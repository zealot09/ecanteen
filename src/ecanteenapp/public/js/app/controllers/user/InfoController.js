define(['App', 'backbone', 'marionette', "views/user/InfoView", "entities/State"],
    function(App, Backbone, Marionette, View) {
        var control = Backbone.Marionette.Controller.extend({
            show: function() {
                var usr = App.request("state:userinfo");
                var view = new View({
                    model: usr
                });
                view.on("update", function() {
                    App.request("state:userfetch");
                    App.trigger("account", true);
                });

                view.on("login", function() {
                    App.trigger("login");
                });

                App.accountView.mainRegion.show(view);
            }
        });
        return new control();
    });