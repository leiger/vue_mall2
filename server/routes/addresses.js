const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const _ = require('lodash');
const Joi = require('@hapi/joi');

// get all address from a user
router.get('/:id', async (req, res) => {
  const addressList = await User.findById(req.params.id).select('addressList');

  if (!addressList) return res.status(404).send('The user was not found!');

  res.send(addressList);
});

// get a address
router.get('/:id/:addressId', async (req, res) => {
  const user = await User.findById(req.params.id);
  const address = user.addressList.id(req.params.addressId);
  if (!address) return res.status(404).send('The address with the given ID was not found');

  res.send(address);
});

//add a address
router.post('/:id', async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('The user with the given ID was not found');

  user.addressList.push(req.body);

  await user.save();
  res.send(req.body);
});

// delete a address
router.delete('/:id/:addressId', async (req, res) => {

  const user = await User.findById(req.params.id);
  const address = user.addressList.id(req.params.addressId).remove();
  if (!address) return res.status(404).send('The address with the given ID was not found');

  await user.save();
  res.send(address);
});

function validate(address) {
  const schema = {
    firstname: Joi.string().allow(''),
    lastname: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    province: Joi.string().required(),
    postalCode: Joi.string().required()
  };
  return Joi.validate(address, schema);
}

module.exports = router;