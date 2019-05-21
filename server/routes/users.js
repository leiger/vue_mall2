const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

// get all users
router.get('/', async (req, res) => {
  const users = await User.find().select('-password');
  res.send(users);
});

// get a user info
router.get('/:id', async (req, res) => {
  const { error } = validateId(req.params);
  if (error) return res.status(404).send(error.details[0].message);

  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).send('The user with the given ID was not found');

  res.send(user);
});

// add a new user
router.post('/', async (req, res) => {
  const { error1 } = validateId(req.params);
  if (error1) return res.status(404).send(error1.details[0].message);

  const { error2 } = validate(req.body);
  if (error2) return res.status(400).send(error2.details[0].message);

  // password twice entered are not the same
  if (req.body.password !== req.body.rePassword) return res.status(400).json({ statusText: 'passwords are no the same' });

  let exist = await User.findOne({
    email: req.body.email
  });
  // email already exist
  if (exist) return res.status(400).send('Email already exist!');

  user = new User({
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10)
  });

  await user.save();

  res.send(_.pick(user, ['_id', 'email']));
});

// update a user's password
router.put('/:id', async (req, res) => {
  const { error1 } = validateId(req.params);
  if (error1) return res.status(404).send(error1.details[0].message);

  const { error2 } = validate(req.body);
  if (error2) return res.status(400).send(error2.details[0].message);

  if (req.body.password !== req.body.rePassword) return res.status(400).send('passwords are no the same');

  let user = await User.findByIdAndUpdate(req.params.id,
    { password: await bcrypt.hash(req.body.password, 10) },
    { new: true }
  );
  if (!user) return res.status(404).send('The user with the given ID was not found');

  res.send(_.pick(user, ['_id', 'email']));
});

// delete a user
router.delete('/:id', async (req, res) => {
  const { error } = validateId(req.params);
  if (error) return res.status(404).send(error.details[0].message);

  let user = await User.findByIdAndRemove(req.params.id);
  if (!user) return res.status(404).send('Cannot find the user');

  res.send(_.pick(user, ['_id', 'email']));
});

function validateId(user) {
  const schema = {
    id: Joi.objectId()
  };
  return Joi.validate(user, schema);
}

function validate(user) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    rePassword: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(user, schema);
}

module.exports = router;