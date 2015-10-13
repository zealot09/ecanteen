define(['App', 'backbone', 'marionette', "views/user/ForgetView", 'notify'],
    function(App, Backbone, Marionette, View) {
        var control = Backbone.Marionette.Controller.extend({
            show: function() {
                var view = new View();
                view.on("continue", function() {
                    $.notify("The password reset email has been sent!", {
                        position: "right bottom",
                        className: 'success'
                    });
                    App.trigger("account");
                });
                App.accountView.mainRegion.show(view);
            }
        });
        return new control();
    });