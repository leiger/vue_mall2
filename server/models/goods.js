let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
  productId: String,
  categoryId: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }],
  productName: String,
  salePrice: Number,
  productImage: String,
  productNum: Number,
  desc: Array
});

module.exports = mongoose.model('Good', productSchema);