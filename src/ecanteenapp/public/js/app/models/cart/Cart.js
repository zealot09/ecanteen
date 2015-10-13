define(["jquery", "backbone", "collections/cart/CartItemList"],
    function($, Backbone, Collection) {
        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({

            // Model Constructor
            initialize: function() {
                var kids = this.get("children");
                var _kids = new Collection(kids);
                this.set("children", _kids);
            },
            urlRoot: "http://kantwait.com/carts/", // @api_root
            // Default values for all of the Model attributes
            defaults: {

            },

            // Get's called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }
        });

        // Returns the Model class
        return Model;

    }

);