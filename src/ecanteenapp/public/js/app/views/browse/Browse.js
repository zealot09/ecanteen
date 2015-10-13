define( ['App', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/browse/browse'],
    function(App, Backbone, Marionette, $, Model, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.Layout.extend( {
            template: template,
            model: new Model({
                mobile: App.mobile
            }),
            regions: {
                leftBar: "#column-left",
                content: ".content-body"
            }
        });
    });