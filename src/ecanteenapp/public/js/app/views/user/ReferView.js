define(['jquery', 'hbs!templates/user/refer', 'backbone', 'marionette', 'backbone.syphon'],
    function($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template: template
            events: {
                "click span": "loveclick"
            },
            loveclick: function(e){
			   console.log('show link');
			}
        });
    });