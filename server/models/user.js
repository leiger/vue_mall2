let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    trim: true
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  },
  avatar: {
    type: String,
    default: '../assets/avatar.png'
  },
  orderList: [{
    type: Schema.Types.ObjectId
  }],
  cartList: [{
    type: new mongoose.Schema({
      _id: {
        type: Schema.Types.ObjectId,
        required: true
      },
      name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        lowercase: true
      },
      newPrice: {
        type: Number,
        required: true,
        min: 0,
        max: 10000
      },
      images: {
        type: Array,
      },
      numInCart: {
        type: Number,
        required: true,
        min: 0
      }
    })
  }],
  addressList: [{
    type: new mongoose.Schema({
      firstname: {
        type: String,
        default: ''
      },
      lastname: String,
      address: String,
      city: String,
      province: String,
      postalCode: String,
    })
  }]
});

module.exports = mongoose.model('User', userSchema, "users");