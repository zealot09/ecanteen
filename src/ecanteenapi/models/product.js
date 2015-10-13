// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var ProductSchema   = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  price: Number,
  sku: String,
  isGroup: Boolean,
  createTime: { type: Date, default: null },
  quantity: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Product', ProductSchema);
