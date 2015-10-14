define( ['App', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/mobile/welcome'],
    function(App, Backbone, Marionette, $, Model, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: template,
            model: new Model({
                mobile: App.mobile
            }),
            initialize: function() {
                _.bindAll(this);
            },
            // View Event Handlers
            events: {

            }
        });
    });
