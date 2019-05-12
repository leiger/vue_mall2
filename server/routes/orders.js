var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let {
  User
} = require('../models/user');
let {
  Order,
  validate
} = require('../models/order');


// get all orders
router.get('/', async (req, res) => {
  let orders = await Order.find().sort('-data.start');
  res.send(orders);
});

// get a order info
router.get('/:id', async (req, res) => {
  let order = await Order.findById(req.params.id);
  if (!order) return res.status(404).send('The order with the given ID was not found');

  res.send(order);
});

// add a new order
router.post('/', async (req, res) => {
  let {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send('Invalid user');

  let {
    total,
    addressId
  } = req.body;
  let address = {};
  user.addressList.forEach(a => {
    if (a._id == addressId) address = a;
  })
  let order = new Order({
    user: {
      _id,
      email: user.email
    },
    total,
    address,
    products: user.cartList
  });
  order = await order.save();
  res.send(order);
});











// create payment
router.post('/createOrder', async (req, res) => {
  try {
    let userId = req.cookies.userId,
      orderTotal = req.body.orderTotal,
      addressId = req.body.addressId;

    let doc = await Users.findOne({
      _id: userId
    });
    let address = '',
      goodsList = [];
    // get address
    doc.addressList.forEach((item) => {
      if (addressId == item._id) {
        address = item;
      }
    });
    // get purchase goods
    goodsList = doc.cartList;
    // delete cart list
    doc.cartList = [];

    // new order id
    let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');

    let order = {
      _id: mongoose.Types.ObjectId(),
      orderTotal: orderTotal,
      addressInfo: address,
      goodsList: goodsList,
      orderStatus: '0',
      createDate: createDate
    };

    // save to orderlist
    doc.orderList.push(order);
    try {
      let doc1 = await doc.save();
      if (doc1) {
        Response(res, '0', result = {
          orderId: order._id,
          orderTotal: order.orderTotal
        });
      }
    } catch (err) {
      Response(res, '1');
      console.log(err);
    }
  } catch (err) {
    Response(res, '1');
    console.log(err);
  }
});

// change order status
router.post('/orderModify', async (req, res) => {
  try {
    let userId = req.cookies.userId,
      orderId = req.body.orderId;

    let doc = await Users.findOne({
      _id: userId
    });
    let orderList = doc.orderList;

    let result = false;
    orderList.forEach(item => {
      if (item._id == orderId) {
        item.orderStatus = true;
        result = true;
      }
    });
    // save the result
    try {
      let doc1 = await doc.save();
      if (doc1 && result) {
        Response(res, '0');
      } else {
        Response(res, '12');
      }
    } catch (err) {
      Response(res, '1');
      console.log(err);
    }
  } catch (err) {
    Response(res, '1');
    console.log(err);
  }
});

router.post('/orderDetail', async (req, res) => {
  try {
    let userId = req.cookies.userId,
      orderId = req.body.orderId;

    let doc = await Users.findOne({
      _id: userId
    });
    let orderList = doc.orderList;
    if (orderList.length > 0) {
      let order = '';
      orderList.forEach(item => {
        if (item._id == orderId) {
          order = item;
        }
      });
      if (order) {
        Response(res, '0', result = order);
      } else {
        Response(res, '5');
      }
    } else {
      Response(res, '5');
    }
  } catch (err) {
    Response(res, '1');
  }
});

module.exports = router;