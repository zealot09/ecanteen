define(['jquery', 'hbs!templates/browse/contents/item', 'backbone', 'marionette', 'notify'],
    function($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template: template,
            initialize: function() {

            },
            events: {
                "click img": "onClickInfo",
                "click .info": "onClickInfo",
                "click .js-wishlist": "onClickWishlist",
                "click .js-share": "onClickShare",
                "click .js-add": "onClickCartBt"
            },
            onClickInfo: function(e) {
                e.preventDefault();
                this.trigger("detail", this.model);
            },
            onClickWishlist: function(e) {
                e.preventDefault();
                $.notify("Feature Coming Soon!", {
                    position: "right bottom",
                    className: 'info'
                });
            },
            onClickShare: function(e) {
                e.preventDefault();
                $.notify("Feature Coming Soon!", {
                    position: "right bottom",
                    className: 'info'
                });
            },
            onClickCartBt: function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger("cart:add", this.model);
                $.notify("Item added.", {
                    position: "right bottom",
                    className: 'success'
                });
            }
        });
    });