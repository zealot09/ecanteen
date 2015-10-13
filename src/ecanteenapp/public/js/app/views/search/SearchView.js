define(['jquery', 'hbs!templates/search/search', 'views/browse/contents/Item', 'backbone', 'marionette', 'backbone.syphon'],
    function($, template, View, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.CompositeView.extend({
            id: "content",
            itemView: View,
            itemViewContainer: ".product-grid",
            template: template,
            events: {
                "submit form": "onSubmitForm"
            },
            onSubmitForm: function(e) {
                e.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                this.trigger("search", data);
            }
        });
    });