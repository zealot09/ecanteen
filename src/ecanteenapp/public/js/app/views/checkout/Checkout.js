define(['jquery', 'hbs!templates/checkout/main', 'backbone', 'marionette'],
    function($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.Layout.extend({
            id: "content",
            template: template,
            regions: {
                checkoutRegion: "#checkout",
                deliveryRegion: "#shipping-address",
                paymentRegion: "#payment-method",
                confirmRegion: "#confirm"
            },
            initialize: function() {

            }
        });
    });