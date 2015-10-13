define(['jquery', 'hbs!templates/user/order_history_detail', 'backbone', 'marionette', 'backbone.syphon'],
    function($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template: template,
            events: {
                "click .js-continue": "onContinue"
            },
            onContinue: function(e) {
                e.preventDefault();
                this.trigger("continue");
            }
        });
    });