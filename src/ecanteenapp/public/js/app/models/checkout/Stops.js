define(["jquery", "backbone", "collections/checkout/Stops"],
    function($, Backbone, Stops) {
        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({
            urlRoot: "http://kantwait.com/getStopListIn3Days/",
            // Model Constructor
            initialize: function() {
                var stops = new Stops(this.get("stops"));
                this.set("stops", stops);
            },

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