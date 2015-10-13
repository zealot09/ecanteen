define(['jquery', 'hbs!templates/checkout/checkout_options', 'backbone', 'marionette', 'backbone.syphon', 'views/checkout/CheckoutPanel'],
    function($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.CheckoutPanel.extend({
            template: template,
            events: {
                "submit #login": "onSubmitLogin"
            },
            onSubmitLogin: function(e) {
                e.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                this.trigger("login", data);
            },
            showWarning: function() {
                this.$(".warning").fadeIn();
            },
            ui: {
                heading: ".checkout-heading"
            }
        });
    });