define(["App", "backbone", "collections/Categories", "models/Category"], function(App, Backbone, Categories, Category) {
    App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {

        var categories = new Categories(window.rawdata1.stores);

        var API = {
            getCategoryEntities: function() {
                return categories;
            },
            getHeaderCategoryEntities: function() {
                return categories.getHeaderCates();
            },
            getCategoryEntity: function(categoryId) {
                return categories.get(categoryId);
            },
            searchCategories: function(sid, cid) {
                var store = categories.get(sid);
                return store.search(cid);
            }
        };

        App.reqres.setHandler("category:entities", function() {
            return API.getCategoryEntities();
        });

        App.reqres.setHandler("category:header-entities", function() {
            return API.getHeaderCategoryEntities();
        });

        App.reqres.setHandler("category:entity", function(id) {
            return API.getCategoryEntity(id);
        });

        App.reqres.setHandler("category:search", function(sid, cid) {
            return API.searchCategories(sid, cid);
        });

        App.reqres.setHandler("category:ancestor", function(model) {
            var curr = model;
            while (true) {
                if (curr.get("type") === "store") {
                    break;
                }
                curr = curr.collection.parent;
            }
            return curr.id;
        });

        App.reqres.setHandler("category:parents", function(model) {
            var elements = [],
                curr = model;
            while (true) {
                if (curr.get("type") === "store") {
                    elements.push(curr);
                    break;
                }
                elements.push(curr);
                curr = curr.collection.parent;
            }
            return new Backbone.Collection(elements.reverse());
        });
    });

    return;
});