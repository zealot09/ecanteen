define(['jquery', 'hbs!templates/user/order_history', 'backbone', 'views/user/OrderHistoryItemView', 'marionette', 'backbone.syphon'],
    function($, template, Backbone, View) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.CompositeView.extend({
            template: template,
            itemView: View,
            itemViewContainer: ".orders",
            events: {
                "submit form": "onSubmitForm"
            }
        });
    });