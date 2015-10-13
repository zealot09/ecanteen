define(['jquery', 'hbs!templates/checkout/confirm_item', 'backbone', 'marionette'],
    function($, template, Backbone) {
        function get_option(str) {
            if (str === "yes") {
                return true;
            } else {
                return false;
            }
        }
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            tagName: 'tr',
            template: template,
            events: {
                "change select": "onSelectChange"
            },
            ui: {
                "subs": "select"
            },
            onSelectChange: function(e) {
                e.preventDefault();
                var sub = get_option(this.ui.subs.val());
                this.model.set("substitute", sub);
            }
        });
    });