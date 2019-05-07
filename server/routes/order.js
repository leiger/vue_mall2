var express = require('express');
var router = express.Router();

let Goods = require('../models/goods');
let Users = require('../models/users');
let categories = require('../models/categories');

let Response = require('./../public/javascripts/response');

router.get('/orderDetail', async (req, res) => {
  try {
    let userId = req.cookies.userId,
      orderId = req.param('orderId');

    let doc = await Users.findOne({
      _id: userId
    });
    let orderList = doc.orderList;
    if (orderList.length > 0) {
      let orderTotal = 0;
      orderList.forEach((item) => {
        if (item.orderId === orderId) {
          orderTotal = item.orderTotal;
        }
      });
      if (orderTotal > 0) {
        Response(res, '0', result = {
          orderId: orderId,
          orderTotal: orderTotal
        });
      } else {
        Response(res, '0', result = {
          orderId: orderId,
        });
      }
    } else {
      Response(res, '5');
    }
  } catch (err) {
    Response(res, '1');
  }
});

module.exports = router;
