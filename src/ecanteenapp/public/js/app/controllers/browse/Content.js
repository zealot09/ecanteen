define(['App', 'backbone', 'marionette', "views/browse/contents/Store", "views/browse/contents/LeafStore", 'views/browse/contents/ItemDetailModal', 'entities/Content', "entities/State", "entities/Cart"],
    function(App, Backbone, Marionette, StoreView, LeafStoreView, ItemDetailModal) {
        var control = Backbone.Marionette.Controller.extend({
            show: function() {
                // Display contents
                var catalog = App.request("state:catalog");
                var that = this;

                catalog.on("sync", function() {
                    if (catalog.get("type") === "leaf") {
                        that.renderStore(catalog, LeafStoreView);
                    } else {
                        that.renderStore(catalog, StoreView);
                    }
                });
                
                catalog.fetch();
            },
            renderStore: function(catalog, View) {
                var collection = catalog.get("children");
                var view = new View({
                    model: catalog,
                    collection: collection
                });
                view.on("itemview:more", function(itemView, model) {
                    var sid = App.request("state:storeid");
                    App.trigger("changeCategory", sid, model.id);
                });
                view.on("search", function(criterion) {
                    App.trigger("search", criterion.search);
                });
                view.on("itemview:detail", function(itemView, model) {
                    var modal = new ItemDetailModal({
                        model: model
                    });
                    modal.on("cart:add", function(model, count){
                        App.request("cart:add", model, count);
                    });
                    App.modalRegion.show(modal);
                });
                view.on("itemview:cart:add", function(itemView, model) {
                    App.request("cart:add", model);
                });
                App.mainLayout.content.show(view);
            }
        });
        return new control();
    });