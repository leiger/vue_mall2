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
  "addressList": [
    {
      "addressId": String,
      "userName": String,
      "streetName": String,
      "postCode": String,
      "tel": String,
      "isDefault": Boolean
    }
  ]
});

module.exports = mongoose.model('User', userSchema, "users");