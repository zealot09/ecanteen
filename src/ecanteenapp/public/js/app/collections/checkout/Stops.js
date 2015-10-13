define(["jquery", "backbone", "models/checkout/Stop"],
    function($, Backbone, Model) {
        // Creates a new Backbone Collection class object
        var Collection = Backbone.Collection.extend({
            // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
            model: Model,
            url: function() {
                return this.urlRoot + this.id;
            }
        });

        return Collection;
    });