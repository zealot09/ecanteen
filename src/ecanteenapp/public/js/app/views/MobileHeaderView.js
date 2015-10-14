define(['backbone', 'marionette', 'jquery', 'hbs!templates/mobile/mobileHeader'],
    function (Backbone, Marionette, $, template) {
        return Backbone.Marionette.ItemView.extend({
            template: template,
            initialize: function() {
                _.bindAll(this);
            },
            onRender: function () {

            }
        });
    });
