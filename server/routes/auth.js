const express = require('express');
const router = express.Router();
const {
  User
} = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('@hapi/joi');

// authentication, login
router.post('/', async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({
    email: req.body.email
  });
  if (!user) return res.status(400).send('Invalid email or password!');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password!');

  // set cookies
  res.cookie("id", user._id);
  res.cookie("email", user.email);
  res.send('success');
});

// logout
router.delete('/', (req, res) => {
  res.clearCookie('id');
  res.clearCookie('email');
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(req, schema);
}

module.exports = router;