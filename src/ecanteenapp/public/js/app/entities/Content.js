define(["App", "backbone", "collections/contents/Categories", "models/contents/StoreCatalog", "models/contents/CategoryCatalog"], function(App, Backbone, Categories, StoreCatalog, CategoryCatalog) {
    App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {

        var API = {
            getContentEntityStore: function(storeId) {
                var catalog = new StoreCatalog({
                    id: storeId
                });
                return catalog;
            },
            getContentEntityCategory: function(cateId) {
                var catalog = new CategoryCatalog({
                    id: cateId
                });
                return catalog;
            }
        };

        App.reqres.setHandler("catalog:entity:store", function(storeId) {
            return API.getContentEntityStore(storeId);
        });

        App.reqres.setHandler("catalog:entity:category", function(cateId) {
            return API.getContentEntityCategory(cateId);
        });

    });

    return;
});