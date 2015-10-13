define(["jquery", "backbone"],
    function($, Backbone) {
        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({
            // Default values for all of the Model attributes
            defaults: {
                count: 0,
                totalPrice: 0,
                substitute: true
            },
            initialize: function() {
                this.addCount(0);
            },

            // Get's called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            },
            addCount: function(num) {
                var unitPrice;
                var ct = this.get("count") || 0;
                ct += num;
                this.set("count", ct);

                if (this.get("onSale")) {
                    unitPrice = parseFloat(this.get("onSalePrice"));
                } else {
                    unitPrice = parseFloat(this.get("price"));
                }
                this.set("totalPrice", unitPrice * ct);
            },
            setCount: function(num) {
                var unitPrice;
                var ct = num;
                this.set("count", ct);

                if (this.get("onSale")) {
                    unitPrice = parseFloat(this.get("onSalePrice"));
                } else {
                    unitPrice = parseFloat(this.get("price"));
                }
                this.set("totalPrice", unitPrice * ct);
            }
        });

        // Returns the Model class
        return Model;

    }

);