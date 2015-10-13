define(['jquery', 'hbs!templates/browse/contents/category', 'backbone', "views/browse/contents/Item", 'marionette'],
    function($, template, Backbone, ItemView) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.CompositeView.extend({
            template: template,
            itemView: ItemView,
            itemViewContainer: ".product-grid",
            initialize: function() {
                this.collection = this.model.get("items");
                this.on("itemview:cart:add", function(itemView, model){
                    this.trigger("cart:add", model);
                });
                this.on("itemview:detail", function(itemView, model){
                    this.trigger("detail", model);
                });
            },
            events: {
                "click .js-more": "onClickMore"
            },
            onClickMore: function(e) {
                e.preventDefault();
                this.trigger("more", this.model);
            }
        });
    });