let mongoose = require('mongoose');
let Joi = require('@hapi/joi');
let Schema = mongoose.Schema;
let {
  categorySchema
} = require('./category');

let productSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    lowercase: true
  },
  category: {
    type: categorySchema,
    required: true
  },
  oldPrice: {
    type: Number,
    min: 0,
    max: 10000
  },
  newPrice: {
    type: Number,
    required: true,
    min: 0,
    max: 10000
  },
  promote: {
    type: Boolean,
    default: false
  },
  images: [{
    type: String
  }],
  numInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 1000
  },
  desc: Array
});

function arrayLimit(val) {
  return val.length <= 3;
}

function validateProduct(product) {
  const schema = {
    name: Joi.string().min(2).max(50).required(),
    categoryId: Joi.objectId().required(),
    oldPrice: Joi.number().min(0).max(10000).optional(),
    newPrice: Joi.number().min(0).max(10000).required(),
    promote: Joi.boolean(),
    images: Joi.array(),
    numInStock: Joi.number().min(0).max(1000).required(),
    desc: Joi.array().optional()
  };
  return Joi.validate(product, schema);
}

exports.productSchema = productSchema;
exports.Product = mongoose.model('Product', productSchema);
exports.validate = validateProduct;