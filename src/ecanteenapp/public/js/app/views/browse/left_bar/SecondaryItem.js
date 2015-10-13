define(['App', 'jquery', 'hbs!templates/browse/left_bar/secondary_item', 'backbone', 'marionette'],
    function(App, $, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            tagName: "li",
            template: template,
            initialize: function() {

            },
            events: {
                "click" : "onClick"
            },
            onClick: function(e){
                e.preventDefault();
                this.trigger("state:category:change", this.model);
            }
        });
    });