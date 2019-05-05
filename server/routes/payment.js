var express = require('express');
var router = express.Router();

let Goods = require('../models/goods');
let Users = require('../models/users');
let categories = require('../models/categories');

let Response = require('./../public/javascripts/response');

// create payment
router.post('/payment', async (req, res) => {
  try {
    let userId = req.cookies.userId,
      orderTotal = req.body.orderTotal,
      addressId = req.body.addressId;

    let doc = await Users.findOne({
      userId: userId
    });
    let address = '',
      goodsList = [];
    // get address
    doc.addressList.forEach((item) => {
      if (addressId === item.addressId) {
        address = item;
      }
    });
    // get purchase goods
    doc.cartList.filter((item) => {
      if (item.checked === '1') {
        goodsList.push(item);
      }
    });

    // new order id
    let platform = '233';
    let r1 = Math.floor(Math.random() * 10);
    let r2 = Math.floor(Math.random() * 10);

    let sysDate = new Date().Format('yyyyMMddhhmmss');
    let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');

    let orderId = platform + r1 + sysDate + r2;

    let order = {
      orderId: orderId,
      orderTotal: orderTotal,
      addressInfo: address,
      goodsList: goodsList,
      orderStatus: '1',
      createDate: createDate
    };
    // console.log(order);

    // save to orderlist
    doc.orderList.push(order);
    try {
      let doc1 = await doc.save();
      Response(res, '0', result = {
        orderId: order.orderId,
        orderTotal: order.orderTotal
      });
    } catch (err) {
      Response(res, '1');
    }
  } catch (err) {
    Response(res, '1');
  }
});

module.exports = router;