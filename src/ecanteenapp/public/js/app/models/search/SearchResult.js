define(["jquery", "backbone", "collections/contents/Items"],
    function($, Backbone, Collection) {
        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({

            // Model Constructor
            initialize: function() {

            },
            urlRoot: "http://kantwait.com/searchPage/",
            // Default values for all of the Model attributes
            defaults: {

            },

            // Get's called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            },
            parse: function(response) {
                var res = new Collection(response.items);
                response.items = res;
                return response;
            }

        });

        // Returns the Model class
        return Model;

    }

);