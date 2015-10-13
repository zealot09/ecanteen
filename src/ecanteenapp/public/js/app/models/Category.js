define(["jquery", "backbone", "collections/SecCategories"],
    function($, Backbone, Collection) {
        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({

            // Model Constructor
            initialize: function() {
                var kids = this.get("children") || {};
                if (kids.length > 0) {
                    var collection = new Collection(kids);
                    collection.parent = this;
                    this.set("children", collection);
                }
            },
            search: function(cid) {
                var kids = this.get("children") || {};
                if (kids.length > 0) {
                    return kids.get(cid) || this.searchChildren(cid);
                }
            },
            searchChildren: function(cid) {
                var res;
                this.get("children").forEach(function(item) {
                    res = res || item.search(cid);
                });
                return res;
            },
            // Default values for all of the Model attributes
            defaults: {
                id: 0,
                name: "More",
                type: "store"
            },

            // Get's called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return Model;

    }

);