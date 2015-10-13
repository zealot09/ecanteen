define(["jquery", "backbone", "collections/contents/Categories"],
    function($, Backbone, Collection) {
        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({

            // Model Constructor
            initialize: function() {

            },
            urlRoot: "http://kantwait.com/get_cate/",
            url: function() {
                return this.urlRoot + this.id + "/";
            },

            // Default values for all of the Model attributes
            defaults: {

            },

            // Get's called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            },
            parse: function(response) {
                var col = new Collection(response.children);
                response.children = col;
                return response;
            }

        });

        // Returns the Model class
        return Model;

    }

);