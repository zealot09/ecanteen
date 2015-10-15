define(['App', 'backbone', 'marionette', 'views/main/BannerView', 'views/main/RecommendProductView',
'collections/product/ProductList'],
function(App, Backbone, Marionette, BannerView, RecommendProductView, ProdutList) {
    var recommendController = Backbone.Marionette.Controller.extend({
      show: function() {
        var products = new ProdutList();
        products.fetch().done(function () {
          var view;
          if(products.length > 0) {
              view = new RecommendProductView({
                collection: products
              });
          }else {

          }
          view.on("show", function() {
            console.log('show recommend view');
          });
          App.mainLayout.recommendRegion.show(view);
        });
      }
    });

    return new recommendController();
});
