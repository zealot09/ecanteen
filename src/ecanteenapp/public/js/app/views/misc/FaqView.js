define(['jquery', 'hbs!templates/misc/faq', 'backbone', 'marionette'],
    function($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template: template,
            ui: {
                menuItems: "li>a"
            },
            onRender: function() {
                var that = this;
                that.ui.menuItems.click(function(e) {
                    var scrolltarget = $(this).attr("href"),
                        offsetTop = scrolltarget === "#" ? 0 : $(scrolltarget).offset().top + 1;
                    $("html, body").stop().animate({
                        scrollTop: offsetTop
                    }, 500);
                    e.preventDefault();
                });

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