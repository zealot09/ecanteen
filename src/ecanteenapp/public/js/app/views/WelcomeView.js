define( ['App', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/mobile/welcome'],
    function(App, Backbone, Marionette, $, Model, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.Layout.extend( {
            template: template,
            regions: {
                bannerRegion: "#banner",
                soldTimeRegion: ".soldTimeSection",
                recommendRegion: ".recommendSection"
            }
        });
    });
