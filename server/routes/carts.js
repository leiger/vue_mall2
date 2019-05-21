const express = require('express');
const router = express.Router();
const { Product } = require('../models/product');
const User = require('../models/user');
const Joi = require('@hapi/joi');
const _ = require('lodash');
Joi.objectId = require('joi-objectid')(Joi);


// get a user's cart
router.get('/:id', async (req, res) => {
  const { error } = validateId(req.params);
  if (error) return res.status(404).send(error.details[0].message);

  const cartList = await User.findById(req.params.id).select('cartList');

  if (!cartList) return res.status(404).send('The user was not found!');

  res.send(cartList);
});

// update a user's cart
router.put('/:id', async (req, res) => {
  const { error1 } = validateId(req.params);
  if (error1) return res.status(404).send(error1.details[0].message);

  const { error2 } = validate(req.body);
  if (error2) return res.status(400).send(error2.details[0].message);

  let user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('The user with the given ID was not found');

  let product = '', num = -1;
  user.cartList.forEach(item => {
    if (item._id == req.body.productId) {
      product = item;
      item.numInCart += parseInt(req.body.changeNum);
      num = item.numInCart;
    }
  });
  // product already exist in cart
  if (product) {
    // delete this product
    if (num <= 0) {
      let deleteOne = await User.findOneAndUpdate({ _id: req.params.id }, {
        $pull: {
          cartList: {
            _id: req.body.productId
          }
        }
      });
      if (!deleteOne) res.status(404).send('The product with the given ID was not found');
    } else {
      await user.save();
    }
    res.send(user.cartList);
  } else {
    let product = await Product.findOne({ _id: req.body.productId });
    if (!product) return res.status(404).send('Can not find the product!');

    let newItem = _.pick(product, ['_id', 'name', 'images', 'newPrice']);
    newItem.numInCart = req.body.changeNum;

    user.cartList.push(newItem);
    await user.save();
    res.send(newItem);
  }
});


// validate params and body
function validateId(user) {
  const schema = {
    id: Joi.objectId(),
  };
  return Joi.validate(user, schema);
}

function validate(user) {
  const schema = {
    productId: Joi.objectId().required(),
    changeNum: Joi.number().required(),
  };
  return Joi.validate(user, schema);
}


module.exports = router;