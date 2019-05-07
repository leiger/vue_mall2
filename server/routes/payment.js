var express = require('express');
var router = express.Router();

let Goods = require('../models/goods');
let Users = require('../models/users');
let categories = require('../models/categories');
let mongoose = require('mongoose');

let Response = require('./../public/javascripts/response');

// create payment
router.post('/payment', async (req, res) => {
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
      console.log(addressId == item._id);
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
      orderStatus: '1',
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

module.exports = router;