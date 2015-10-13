define(['jquery', 'hbs!templates/browse/left_bar/parent_item', 'backbone', 'views/browse/left_bar/SecondaryItem', 'marionette'],
    function($, template, Backbone, ItemView) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            tagName: "li",
            template: template,
            initialize: function() {
                
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