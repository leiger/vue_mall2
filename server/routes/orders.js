var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let User = require('../models/user');
let { Order, validate, validateId } = require('../models/order');

// get all orders
router.get('/', async (req, res) => {
  let orders = await Order.find().sort('-data.start');
  res.send(orders);
});

// get a order info
router.get('/:id', async (req, res) => {
  const { error } = validateId(req.params);
  if (error) return res.status(404).send(error.details[0].message);

  let order = await Order.findById(req.params.id);
  if (!order) return res.status(404).send('The order with the given ID was not found');

  res.send(order);
});

// add a new order
router.post('/', async (req, res) => {
  const { error1 } = validateId(req.params);
  if (error1) return res.status(404).send(error1.details[0].message);

  let { error2 } = validate(req.body);
  if (error2) return res.status(400).send(error2.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send('Invalid user');

  let { total, addressId } = req.body;
  let address = {};
  user.addressList.forEach(a => {
    if (a._id == addressId) address = a;
  })
  let order = new Order({
    _id: mongoose.Types.ObjectId(),
    user: {
      _id: req.body.userId,
      email: user.email
    },
    total,
    address,
    products: user.cartList
  });
  order = await order.save();
  // delete cart
  user.cartList = [];
  user.orderList.push(order._id);
  await user.save();

  res.send(order);
});

router.put('/:id', async (req, res) => {
  const { error } = validateId(req.params);
  if (error) return res.status(404).send(error.details[0].message);

  let order = await Order.findById(req.params.id);
  if (!order) return res.status(404).send('The order with the given ID was not found');

  order.status = req.body.status;
  order.date.paid = req.body.date;
  await order.save();

  res.send(order);
})

module.exports = router;