define(['App', 'backbone', 'marionette', 'views/WelcomeView', 'views/MobileHeaderView', 'collections/product/ProductList'],
    function (App, Backbone, Marionette, WelcomeView, MobileHeaderView, ProdutList) {
    return Backbone.Marionette.Controller.extend({
        initialize:function (options) {
            App.headerRegion.show(new MobileHeaderView());

            var products = new ProdutList();
            products.fetch();
            
            App.mainRegion.show(new WelcomeView());
        },
        //gets mapped to in AppRouter's appRoutes
        index:function () {
            App.mainRegion.show(new WelcomeView());
        }
    });
});
