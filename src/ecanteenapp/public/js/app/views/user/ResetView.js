define(['jquery', 'hbs!templates/user/reset_password', 'backbone', 'marionette', 'backbone.syphon'],
    function($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template: template,
            events: {
                "submit form": "formSubmitted"
            },
            formSubmitted: function(e) {
                e.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                var that = this;
                if (data.password === data.confirm) {
                    that.trigger("submit", data);
                } else {
                    that.showWarning();
                }
            },
            showWarning: function() {
                this.$(".warning").show();
            }
        });
    });