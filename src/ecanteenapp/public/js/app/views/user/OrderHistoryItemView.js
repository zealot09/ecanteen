define(['jquery', 'hbs!templates/user/order_history_item', 'backbone', 'marionette', 'backbone.syphon'],
    function($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template: template,
            events: {
                "click .js-detail": "onDetail"
            },
            onDetail: function(e) {
                e.preventDefault();
                this.trigger("detail", this.model);
            }
        });
    });