let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

let categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

function validateCategory(category) {
  const schema = {
    name: Joi.string().min(2).max(50).required()
  };
  return Joi.validate(category, schema);
}

function validateId(category) {
  const schema = {
    id: Joi.objectId()
  };
  return Joi.validate(category, schema);
}

exports.Category= mongoose.model('Category', categorySchema, "categories");
exports.validate = validateCategory;
exports.validateId = validateId;
exports.categorySchema = categorySchema;