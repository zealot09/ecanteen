define(['App', 'backbone', 'marionette', 'views/WelcomeView', 'views/MobileHeaderView',
'collections/product/ProductList', 'controllers/main/RecommendController',
'controllers/main/BannerController'],
    function (App, Backbone, Marionette, WelcomeView, MobileHeaderView, ProdutList, RecommendController, BannerController) {
    return Backbone.Marionette.Controller.extend({
        initialize:function (options) {
            App.headerRegion.show(new MobileHeaderView());

            var view = new WelcomeView();

            App.mainLayout = view;


            view.on('show', function () {
                RecommendController.show();
                // BannerController.show();
            });
            App.mainRegion.show(App.mainLayout);
        },
        //gets mapped to in AppRouter's appRoutes
        index:function () {
            App.mainRegion.show(new WelcomeView());
        }
    });
});
