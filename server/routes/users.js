var express = require('express');
var router = express.Router();

let Users = require('./../models/users');
require('./../public/javascripts/date');
let Response = require('./../public/javascripts/response');

// login
router.post('/login', async (req, res) => {
  let param = {
    userName: req.body.username,
    userPwd: req.body.password
  };
  try {
    let doc = await Users.findOne(param);

    if (doc) {
      // set cookies 1h
      res.cookie("userId", doc.userId, {
        path: '/',
        maxAge: 1000 * 60 * 60
      });
      res.cookie("userName", doc.userName, {
        path: '/',
        maxAge: 1000 * 60 * 60
      });
      Response(res, '0', {
        userName: doc.userName
      });
    } else {
      Response(res, '2');
    }
  } catch (err) {
    Response(res, '1');
  }
});

// logout
router.post('/logout', (req, res, next) => {
  try {
    res.cookie('userId', '', {
      path: '/',
      maxAge: -1
    });
    res.cookie('userName', '', {
      path: '/',
      maxAge: -1
    });
    Response(res, '0');
  } catch (err) {
    Response(res, '1');
  }
});

// check wheather the user is login in
router.get('/checkLogin', (req, res) => {
  try {
    if (req.cookies.userId) {
      Response(res, '0', req.cookies.userName || '');
    } else {
      Response(res, '3');
    }
  } catch (err) {
    Response(res, '1');
  }
});

// show cart list
router.get('/cartList', async (req, res) => {
  try {
    let userId = req.cookies.userId;
    let doc = await Users.findOne({
      userId: userId
    });
    Response(res, '0', doc.cartList);
  } catch (err) {
    Response(res, '1');
  }
});

// edit the number of goods in cart
router.post('/cartEdit', async (req, res) => {
  try {
    let userId = req.cookies.userId;
    let productId = req.body.productId;
    let productNum = req.body.productNum;
    let checked = req.body.checked;

    let doc = await Users.update({
      'userId': userId,
      "cartList.productId": productId
    }, {
      'cartList.$.productNum': productNum,
      'cartList.$.checked': checked
    });
    if (doc) {
      Response(res, '0');
    } else {
      Response(res, '4');
    }
  } catch (err) {
    Response(res, '1');
  }
});


router.get('/addressList', async (req, res) => {
  try {
    let userId = req.cookies.userId;

    let doc = await Users.findOne({
      userId: userId
    });
    Response(res, '0', doc.addressList);
  } catch (err) {
    Response(res, '1');
  }
});


router.post('/setDefault', async (req, res) => {
  try {
    let userId = req.cookies.userId,
      addressId = req.body.addressId;

    let doc = await Users.findOne({
      userId: userId
    });
    let addressList = doc.addressList;
    addressList.forEach((item) => {
      if (item.addressId === addressId) {
        item.isDefault = true;
      } else {
        item.isDefault = false;
      }
    });
    try {
      let doc1 = await doc.save();
      if (doc1) {
        Response(res, '0');
      }
    } catch (err) {
      Response(res, '1');
    }
  } catch (err) {
    Response(res, '1');
  }
});

// delete address
router.post('/delAddress', function (req, res, next) {
  let userId = req.cookies.userId,
    addressId = req.body.addressId;

  Users.update({
    userId: userId
  }, {
    $pull: {
      'addressList': {
        'addressId': addressId
      }
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: ''
      });
    }
  });
});

// find addressId and return detail
router.post('/getAddress', function (req, res, next) {
  let userId = req.cookies.userId,
    addressId = req.body.addressId;

  Users.findOne({
    userId: userId
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      let addressList = doc.addressList;
      addressList.forEach((item) => {
        if (item.addressId === addressId) {
          res.json({
            status: '0',
            msg: '',
            result: item
          })
        }
      });
    }
  })

});
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

router.get('/orderDetail', async (req, res) => {
  try {
    let userId = req.cookies.userId,
      orderId = req.param('orderId');

    let doc = await Users.findOne({
      userId: userId
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