define(["App", "backbone", "collections/product/ProductList", "models/Product"], function(App, Backbone, ProductList, Product) {
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
      var API = {
          getRecommendProducts: function() {

          }
      }

      App.reqres.setHandler("product:recommend", function() {
          API.getRecommendProducts();
      });
  }
});
