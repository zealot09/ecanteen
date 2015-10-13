define(['jquery', 'hbs!templates/browse/left_bar/base', 'backbone', 'marionette'],
    function($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.Layout.extend({
            template: template,
            regions: {
                parents: ".js-parents",
                cates: ".js-cates"
            }
        });
    });