define(['App',"jquery","backbone","models/product/Product"],
  function(App, $, Backbone, Model) {
    // Creates a new Backbone Collection class object
    var Collection = Backbone.Collection.extend({
      model: Model,
      url : App.baseUrl + '/products',
      // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
    });

    return Collection;
  });
