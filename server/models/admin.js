let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let adminSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 2,
    maxlength: 255
  },
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
  avatar: {
    type: String,
    default: '../assets/avatar.png'
  },
  title: {
    type: String,
    required: true
  }
});

function validateAdmin(admin) {
  const schema = {
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(50).required(),
    title: Joi.string().required()
  };
  return Joi.validate(admin, schema);
}

exports.Admin = mongoose.model('Admin', adminSchema, "admins");
exports.validate = validateAdmin;