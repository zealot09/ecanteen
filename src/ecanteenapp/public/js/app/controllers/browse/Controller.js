define(['App', 'backbone', 'marionette', 'controllers/browse/LeftBar', 'controllers/browse/Content', 'views/browse/Browse'],
    function(App, Backbone, Marionette, LeftBar, Content, Layout) {
        var control = Backbone.Marionette.Controller.extend({
            showStore: function() {
                App.mainLayout = new Layout();
                App.mainLayout.on("show", function() {
                    LeftBar.show();
                    Content.show();
                });
                
                App.mainRegion.show(App.mainLayout);
            }
        });
        return new control();
    });