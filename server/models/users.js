let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  userName: String,
  userPwd: String,
  orderList: [{
    _id: mongoose.Types.ObjectId,
    orderTotal: Number,
    addressInfo: Object,
    goodsList: Array,
    orderStatus: Number,
    createDate: String
  }],
  cartList: [{
    _id: mongoose.Types.ObjectId,
    productId: String,
    productName: String,
    salePrice: String,
    productImage: String,
    productNum: Number
  }],
  addressList: [{
    _id: mongoose.Types.ObjectId,
    firstname: String,
    lastName: String,
    address: String,
    city: String,
    province: String,
    postalCode: String,
    _default: Boolean
  }]
});

module.exports = mongoose.model('User', userSchema, "users");