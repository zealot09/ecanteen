define(['jquery', 'hbs!templates/header/store', 'backbone', 'views/header/Secondary', 'marionette'],
    function($, template, Backbone, ItemView) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.CompositeView.extend({
            tagName: "li",
            template: template,
            itemViewContainer: "ul",
            itemView: ItemView,
            initialize: function() {
                this.on("itemview:state:category:change", function(childView, model) {
                    this.trigger("state:category:change", model);
                });
                this.on("itemview:state:store:change", function(childView, model) {
                    this.trigger("state:store:change", model);
                });

                this.collection = this.model.get("children");
            }
        });
    });