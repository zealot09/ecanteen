define(['jquery', 'hbs!templates/paypal', 'backbone', 'marionette'],
    function($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template: template,
            pay: function() {
                this.$("form").submit();
            }
        });
    });