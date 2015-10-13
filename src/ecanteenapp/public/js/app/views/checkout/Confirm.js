define(['jquery', 'hbs!templates/checkout/confirm', 'backbone', 'views/checkout/ConfirmItem', 'marionette'],
    function($, template, Backbone, View) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.CheckoutPanel.extend({
            template: template,
            itemView: View,
            itemViewContainer: "tbody",
            modelEvents: {
                "change": "onModelChange"
            },
            onModelChange: function() {
                this.render();
                this.delegateEvents();
            },
            showWarning: function() {
                this.$(".warning").fadeIn();
            },
            events: {
                "click .js-continue": "onContinueClick",
                "click .checkout-heading a": "onClickModify",
                "click .js-share": "shareFB"
            },
            shareFB: function(e) {
                e.preventDefault();
                this.trigger("gift");
                var saved = (parseFloat(this.model.get("totalPrice")) / 9).toFixed(2);
                FB.ui({
                    method: 'feed',
                    link: 'http://kantwait.com/#stores/1/',
                    caption: 'Just saved $' + saved + " at Kantwait.com!",
                    picture: 'http://kantwait.com/static/image/promo/promo_1.png',
                    name: 'FarEast Grocery Store',
                    description: 'KantWait - Reinvent Delivery.'
                }, function(response) {});
            }
        });
    });