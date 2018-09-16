let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
  "productId": String,
  "productName": String,
  "salePrice": Number,
  "productNum": Number,
  "checked": String,
  "productImage": String
});

module.exports = mongoose.model('Good', productSchema);