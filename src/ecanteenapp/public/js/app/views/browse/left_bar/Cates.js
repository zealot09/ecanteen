define(['jquery', 'backbone', 'views/browse/left_bar/Item', 'marionette'],
    function($, Backbone, ItemView) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.CollectionView.extend({
            tagName: "ul",
            itemView: ItemView,
            onRender: function() {
                var that = this;
                that.$(".cc").click(function() {
                    if ($(this).next().is(':visible') === false) {
                        that.$('.col-subcat').slideUp(300, function() {
                            $(this).removeClass('active');
                            $('.cc').removeClass('open');
                        });
                    }
                    if ($(this).hasClass('open') === true) {
                        $(this).next().slideUp(300, function() {
                            $(this).removeClass('active');
                            $(this).prev().removeClass('open');
                        });
                    } else {
                        $(this).next().slideDown(300, function() {
                            $(this).addClass('active');
                            $(this).prev().addClass('open');
                        });
                    }
                });
            }
        });
    });