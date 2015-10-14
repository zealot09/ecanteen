define(['jquery', 'hbs!templates/mobile/productItem', 'backbone', 'marionette'], function() {
    function($, template, Backbone) {
        return Backbone.Marionette.ItemView.extend({
            template: template,
            initialize: function() {}
        });
    }
});
