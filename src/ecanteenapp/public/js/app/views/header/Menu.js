define(['jquery', 'hbs!templates/header/menu', 'backbone', 'views/header/HeaderItem', 'marionette', 'entities/Category'],
    function($, template, Backbone, ItemView) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.CollectionView.extend({
            tagName: "ul",
            className: "menu-data",
            itemView: ItemView
        });
    });