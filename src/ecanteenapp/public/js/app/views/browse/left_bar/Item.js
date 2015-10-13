define(['jquery', 'hbs!templates/browse/left_bar/item', 'backbone', 'views/browse/left_bar/SecondaryItem', 'marionette'],
    function($, template, Backbone, ItemView) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.CompositeView.extend({
            tagName: "li",
            template: template,
            itemView: ItemView,
            itemViewContainer: "ul",
            initialize: function() {
                this.on("itemview:state:category:change", function(childView, model) {
                    this.trigger("state:category:change", model);
                });
                var kids = this.model.get("children");
                if (kids && kids.length > 0) {
                    this.collection = this.model.get("children");
                } else {
                    this.itemViewContainer = undefined;
                }
            },
            events: {
                "click .js-item-name": "onClick"
            },
            onClick: function(e) {
                e.preventDefault();
                if (this.model.get("type") === "store") {
                    this.trigger("state:store:change", this.model);
                } else {
                    this.trigger("state:category:change", this.model);
                }
            }
        });
    });