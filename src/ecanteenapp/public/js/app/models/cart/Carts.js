define(["jquery", "backbone", "models/cart/Cart", "collections/cart/CartItemList"],
    function($, Backbone, SubModel, Collection) {
        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({
            url: "http://api.ecanteen.com/carts/", // @api_root
            // Model Constructor
            initialize: function() {

            },

            // Default values for all of the Model attributes
            defaults: {

            },

            // Get's called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            },
            parse: function(response) {
                var that = this;
                for (var prop in response) {
                    var obj = that.get(prop),
                        val = response[prop],
                        _kids = new Collection(val.children);
                    val.children = _kids;
                    if (obj) {
                        obj.set(val);
                    } else {
                        var ct = new SubModel();
                        ct.set(val);
                        that.set(prop, ct);
                    }
                }
            }
        });

        // Returns the Model class
        return Model;
    }
);