let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  "userId": String,
  "userName": String,
  "userPwd": String,
  "orderList": Array,
  "cartList": [
    {
      "productImage": String,
      "salePrice": String,
      "productName": String,
      "productId": String,
      "productNum": Number,
      "checked": String
    }
  ],
  "addressList": Array
});

module.exports = mongoose.model('User', userSchema, "users");