var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecanteen');

var auth = require('./auth.js');
// var products = require('./products.js');
var ProductApi = require('../controllers/product.js');
var user = require('./users.js');

router.post('/login', auth.login);

router.get('/api/v1/products', ProductApi.getProducts);
router.get('/api/v1/product/:id', ProductApi.getProduct);
router.post('/api/v1/product/', ProductApi.postProducts);
/*
 * Routes that can be accessed only by autheticated users
 */
// router.get('/api/v1/products', products.getAll);
// router.get('/api/v1/product/:id', products.getOne);
// router.post('/api/v1/product/', products.create);
// router.put('/api/v1/product/:id', products.update);
// router.delete('/api/v1/product/:id', products.delete);

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);

module.exports = router;
