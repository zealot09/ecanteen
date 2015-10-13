define(['App', 'backbone', 'marionette', "views/header/Menu"],
    function(App, Backbone, Marionette, View) {
        var control = Backbone.Marionette.Controller.extend({
            show: function() {
                var categories = App.request("category:header-entities");
                var view = new View({
                    collection: categories
                });

                view.on("itemview:state:category:change", function(childView, model) {
                    App.request("state:category:change", model);
                    App.trigger("cart:refresh");
                });
                view.on("itemview:state:store:change", function(childView, model) {
                    App.request("state:store:change", model.id);
                    App.trigger("cart:refresh");
                });

                App.headerLayout.menuRegion.show(view);
            }
        });
        return new control();
    });