define(['App', 'backbone', 'marionette', "views/user/OrderHistoryView", "collections/user/Orders", "views/user/OrderHistoryDetailView", "entities/State"],
    function(App, Backbone, Marionette, View, Collection, DetailView) {
        var control = Backbone.Marionette.Controller.extend({
            show: function() {
                var historyPromise = App.request("state:orderHistory");
                historyPromise.done(function(response) {
                    var col = new Collection(response);
                    var view = new View({
                        collection: col
                    });
                    view.on("itemview:detail", function(itemView, model) {
                        var subView = new DetailView({
                            model: model
                        });
                        subView.on("continue", function() {
                            App.accountView.mainRegion.show(view);
                        });
                        App.accountView.mainRegion.show(subView);
                    });
                    App.accountView.mainRegion.show(view);
                });
            }
        });
        return new control();
    });