let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

let orderSchema = new Schema({
  user: {
    type: new mongoose.Schema({
      _id: {
        type: Schema.Types.ObjectId,
        required: true
      },
      email: {
        type: String,
        required: 'Email address is required',
        trim: true,
        validate: [validateEmail, 'Please fill a valid email address'],
      }
    }),
    required: true
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
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
});

function validateEmail(email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

function validateId(order) {
  const schema = {
    id: Joi.objectId()
  };
  return Joi.validate(order, schema);
}

function validateOrder(user) {
  const schema = {
    userId: Joi.string(),
    addressId: Joi.string(),
    total: Joi.number().min(0).required()
  };
  return Joi.validate(user, schema);
}

exports.validate = validateOrder;
exports.validateId = validateId;
exports.Order = mongoose.model('Order', orderSchema, "orders");