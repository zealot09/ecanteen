define(["jquery", "backbone", "models/Category", "collections/SecCategories"],
    function($, Backbone, Model, Collection) {
        // Creates a new Backbone Collection class object
        var collection = Backbone.Collection.extend({
            // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
            model: Model,
            comparator: "id",
            getHiddenCates: function() {
                return this.without.apply(this, this.getVisibleCates());
            },
            getVisibleCates: function() {
                var always_show = [1, 2, 3, 4, 5, 8];
                return this.filter(function(item) {
                    return _.contains(always_show, item.id);
                });
            },
            getHeaderCates: function() {
                var self = this.clone(),
                    more = new Model(),
                    col = new Collection();
                col.add(self.getHiddenCates());
                more.set("children", col);
                self.remove(self.getHiddenCates());
                // self.add(more);
                return self;
            }
        });

        return collection;
    });
