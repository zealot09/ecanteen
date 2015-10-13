define(['jquery', 'hbs!templates/header/secondary', 'backbone', 'marionette'],
    function($, template, Backbone) {
        //ItemView provides some default rendering logic
        var view = Backbone.Marionette.CompositeView.extend({
            tagName: "li",
            template: template,
            itemView: view,
            itemViewContainer: "ul",
            initialize: function() {
                this.on("itemview:state:category:change", function(childView, model) {
                    this.trigger("state:category:change", model);
                });

                var children = this.model.get("children") || {};
                if (children.length > 0) {
                    this.$el.addClass("sub");
                    this.collection = this.model.get("children");
                } else {
                    this.itemView = undefined;
                    this.itemViewContainer = undefined;
                }
            },
            events: {
                "click": "onClick"
            },
            onClick: function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(e);
                if (this.model.get("type") === "store") {
                    this.trigger("state:store:change", this.model);
                } else {
                    this.trigger("state:category:change", this.model);
                }
            }
        });

        return view;
    });