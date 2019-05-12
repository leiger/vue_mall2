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
  orderList: [{
    total: Number,
    address: Object,
    products: Array,
    status: {
      type: Number,
      default: 0,
      required: true
    },
    date: {
      start: {
        type: Date,
        default: Date.now,
        required: true
      },
      paid: Date,
      shipping: Date,
      finish: Date,
      cancel: Date
    }
  }],
  cartList: [{
    type: new mongoose.Schema({
      _id:{
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
      firstname: String,
      lastname: String,
      address: String,
      city: String,
      province: String,
      postalCode: String,
    })
  }]
});

module.exports = mongoose.model('User', userSchema, "users");