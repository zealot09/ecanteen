define(['App', 'backbone', 'marionette', 'views/search/SearchView', 'views/browse/contents/ItemDetailModal', 'entities/Search'],
    function(App, Backbone, Marionette, View, ItemDetailModal) {
        var control = Backbone.Marionette.Controller.extend({
            show: function(criterion) {
                var searchPromise = App.request("search:store", criterion);
                searchPromise.done(function(res) {
                    var view = new View({
                        model: res,
                        collection: res.get("items")
                    });
                    view.on("itemview:cart:add", function(itemView, model) {
                        App.request("cart:add", model);
                    });
                    view.on("itemview:detail", function(itemView, model) {
                        var modal = new ItemDetailModal({
                            model: model
                        });
                        modal.on("cart:add", function(model, count) {
                            App.request("cart:add", model, count);
                        });
                        App.modalRegion.show(modal);
                    });
                    view.on("search", function(criterion) {
                        App.trigger("search", criterion.search);
                    });
                    App.mainRegion.show(view);
                });
            }
        });
        return new control();
    });