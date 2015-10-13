define(['App', 'backbone', 'marionette', "views/header/Stat", "entities/State"],
    function(App, Backbone, Marionette, View) {
        var control = Backbone.Marionette.Controller.extend({
            show: function() {
                var user = App.request("state:userinfo");
                var view = new View({
                    model: user
                });
                view.on("logout", function(){
                    App.request("state:logout");
                });
                App.headerLayout.statRegion.show(view);
            }
        });
        return new control();
    });