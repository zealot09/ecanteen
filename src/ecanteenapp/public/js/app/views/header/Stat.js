define(['jquery', 'hbs!templates/header/stat', 'backbone', 'marionette'],
    function($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template: template,
            modelEvents: {
                "change": "modelChanged"
            },
            modelChanged: function() {
                this.render();
            },
            events: {
                "click #logout": "logout"
            },
            logout: function(e) {
                e.preventDefault();
                this.trigger("logout");
            }
        });
    });