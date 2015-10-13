var Product = require('../models/product');
var API = {
  postProducts : function(req, res) {
  // Create a new instance of the Beer model
  var product = new Product();

  // Set the beer properties that came from the POST data
  product.name = req.body.name;
  product.type = req.body.type;
  product.quantity = req.body.quantity;

  // Save the beer and check for errors
  product.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'product added to the locker!', data: product });
  });
},
getProducts : function(req, res) {
  // Use the Beer model to find all beer
  Product.find(function(err, products) {
    if (err)
      res.send(err);

    res.json(products);
  });
},
getProduct : function(req, res) {
  // Use the Beer model to find a specific beer
  Product.findById(req.params.product_id, function(err, product) {
    if (err)
      res.send(err);

    res.json(product);
  });
}
}

module.exports = API;
