define(['App', 'backbone', 'marionette', 'views/header/Header', 'controllers/header/HeaderCartController', 'controllers/header/HeaderMenuController', 'controllers/header/HeaderStatController', 'entities/State'],
    function(App, Backbone, Marionette, View, CartController, MenuController, StatController) {
        var control = Backbone.Marionette.Controller.extend({
            show: function() {
                var user = App.request("state:isLoggedIn");
                var view = new View({
                    model: user
                });
                App.headerLayout = view;
                view.on("home", function() {
                    var sid = App.request("state:storeid");
                    App.request("state:store:change", sid);
                    App.navigate("#");
                });
                view.on("search", function(criterion) {
                    App.trigger("search", criterion.search);
                });
                view.on("show", function() {
                    CartController.show();
                    MenuController.show();
                    StatController.show();
                });
                App.on("cart:refresh", function() {
                    CartController.show();
                });
                App.headerRegion.show(App.headerLayout);
            }
        });
        return new control();
    });