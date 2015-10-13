define(['jquery', 'hbs!templates/checkout/payment_method', 'backbone', 'marionette', 'views/checkout/CheckoutPanel'],
    function($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.CheckoutPanel.extend({
            template: template,
            initialize: function() {

            },
            updatePayment: function(info) {
                this.model.set(info);
                this.render().appear();
            },
            events: {
                "submit #withkredit": "onSubmitKredit",
                "submit .js-paypal": "onSubmitPaypal",
                "click .js_checkout_success": "onSuccessfulCheckout"
            },
            ui: {
                form: ".box-form",
                processing: ".processing",
                successful: ".successful",
                insufficient: ".insufficient",
                paypal_confirm: ".paypal-confirm"
            },
            onSubmitKredit: function(e) {
                e.preventDefault();
                this.ui.form.hide();
                this.ui.processing.slideDown();
                var that = this;
                var sid = this.model.get("orderid");
                $.ajax({
                    url: "http://kantwait.com/payWithKredit/" + sid + "/", //@api_addr
                    type: "POST"
                }).done(function(data) {
                    if (data.status === "success") {
                        that.ui.processing.slideUp();
                        that.ui.successful.slideDown();
                        that.trigger("success");
                    } else {
                        that.ui.processing.hide();
                        that.ui.insufficient.slideDown();
                        that.ui.form.slideDown();
                    }
                });
            },
            onSubmitPaypal: function(e) {
                this.ui.form.hide();
                this.ui.paypal_confirm.show();
            },
            onSuccessfulCheckout: function(e) {
                e.preventDefault();
                this.trigger("success", true);
            }
        });
    });