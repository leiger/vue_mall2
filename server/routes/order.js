var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');

let Goods = require('../models/goods');
let Users = require('../models/users');

let Response = require('./../public/javascripts/response');

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