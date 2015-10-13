define(["backbone", "marionette"], function(Backbone, Marionette) {
    Backbone.Marionette.CheckoutPanel = Backbone.Marionette.CompositeView.extend({
        appear: function() {
            this.$(".checkout-content").slideDown("slow");
        },
        disappear: function() {
            this.$(".checkout-content").slideUp();
        },
        events: {
            "click .js-continue": "onContinueClick",
            "click .checkout-heading a": "onClickModify"
        },
        onContinueClick: function(e) {
            e.preventDefault();
            this.$(".checkout-heading a").fadeIn();
            this.trigger("continue");
        },
        onClickModify: function(e) {
            this.trigger("closeothers");
            this.appear();
        }
    });

    return Backbone.Marionette.CheckoutPanel;
});