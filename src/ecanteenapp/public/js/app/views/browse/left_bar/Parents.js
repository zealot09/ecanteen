define(['jquery', 'backbone', 'views/browse/left_bar/ParentItem', 'marionette'],
    function($, Backbone, ItemView) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.CollectionView.extend({
            tagName: "ul",
            itemView: ItemView
        });
    });