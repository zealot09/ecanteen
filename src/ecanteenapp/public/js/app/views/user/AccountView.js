define(['jquery', 'hbs!templates/user/account', 'backbone', 'marionette'],
    function($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.Layout.extend({
            template: template,
            regions: {
                mainRegion: ".content-body"
            }
        });
    });