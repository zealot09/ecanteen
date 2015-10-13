define(['jquery', 'hbs!templates/header/header', 'backbone', 'views/header/Menu', 'marionette', 'entities/Category', 'backbone.syphon'],
    function($, template, Backbone, ItemView) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.Layout.extend({
            template: template,
            regions: {
                cartRegion: ".js-cart",
                menuRegion: "#kw_store_list",
                statRegion: "#welcome"
            },
            events: {
                "submit form": "onSubmitForm",
                "click .home-btn": "onClickHome"
            },
            onSubmitForm: function(e) {
                e.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                this.trigger("search", data);
            },
            onClickHome: function(e) {
                e.preventDefault();
                this.trigger("home");
            }
        });
    });