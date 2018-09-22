var express = require('express');
var router = express.Router();

let Users = require('./../models/users');
require('./../public/javascripts/date');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// login
router.post('/login', function (req, res, next) {
  let param = {
    userName: req.body.username,
    userPwd: req.body.password
  };
  Users.findOne(param, function (err, doc) {
    // console.log(doc);
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      });
    }
    else {
      if (doc) {
        // cookie and session
        res.cookie("userId", doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.cookie("userName", doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        // req.session.user = doc;

        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        })
      }
      else {
        // can't find the user
        res.json({
          status: '2',
          msg: ''
        })
      }
    }
  });
});

// logout
router.post('/logout', function (req, res, next) {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  });
  res.cookie('userName', '', {
    path: '/',
    maxAge: -1
  });
  res.json({
    status: '0',
    msg: '',
    result: ''
  })
});

// check wheather the user is login in
router.get('/checkLogin', function (req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName || ''
    });
  }
  else {
    res.json({
      status: '1',
      msg: 'Not Login',
      result: ''
    });
  }
});

// show cart list
router.get('/cartList', function (req, res, next) {
  let userId = req.cookies.userId;
  Users.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    }
    else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.cartList
        });
      }
    }
  })
});

// edit the number of goods in cart
router.post('/cartEdit', function (req, res, next) {
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  let productNum = req.body.productNum;
  let checked = req.body.checked;

  Users.update({'userId': userId, "cartList.productId": productId}, {
    'cartList.$.productNum': productNum,
    'cartList.$.checked': checked
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    }
    else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      });
    }
  })

});

router.post('/editCheckAll', function (req, res, next) {
  let userId = req.cookies.userId,
    checkAll = req.body.checkAll;

  Users.findOne({userId: userId}, function (err, user) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    }
    else {
      if (user) {
        user.cartList.forEach((item) => {
          item.checked = checkAll;
        });
        user.save(function (err1, doc) {
          if (err1) {
            res.json({
              status: '1',
              msg: err.message,
              result: ''
            });
          }
          else {
            res.json({
              status: '0',
              msg: '',
              result: 'suc'
            });
          }
        })
      }
    }
  });
});

router.get('/addressList', function (req, res, next) {
  let userId = req.cookies.userId;

  Users.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    }
    else {
      res.json({
        status: '0',
        msg: '',
        result: doc.addressList
      })
    }
  })
});

router.post('/setDefault', (req, res, next) => {
  let userId = req.cookies.userId,
    addressId = req.body.addressId;

  if (!addressId) {
    res.json({
      status: '1003',
      msg: 'addressId is null',
      result: ''
    });
  }
  else {
    Users.findOne({userId: userId}, function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        });
      }
      else {
        let addressList = doc.addressList;
        addressList.forEach((item) => {
          if (item.addressId === addressId) {
            item.isDefault = true;
          }
          else {
            item.isDefault = false;
          }
        });
      }
      doc.save(function (err1, doc1) {
        if (err1) {
          res.json({
            status: '1',
            msg: err.message,
            result: ''
          });
        }
        else {
          res.json({
            status: '0',
            msg: '',
            result: ''
          })
        }
      });
    });
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
    }
    else {
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

  Users.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    }
    else {
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
router.post('/payment', function (req, res, next) {
  let userId = req.cookies.userId,
    orderTotal = req.body.orderTotal,
    addressId = req.body.addressId;

  Users.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    }
    else {
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
      doc.save(function (err1, doc1) {
        if (err1) {
          res.json({
            status: '1',
            msg: err.message,
            result: ''
          });
        }
        else {
          res.json({
            status: '0',
            msg: '',
            result: {
              orderId: order.orderId,
              orderTotal: order.orderTotal
            }
          });
        }
      });
    }
  })
});

router.get('/orderDetail', function (req, res, next) {
  let userId = req.cookies.userId,
    orderId = req.param('orderId');
  Users.findOne({userId: userId}, function (err, userInfo) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    }
    else {
      let orderList = userInfo.orderList;
      if (orderList.length > 0) {
        let orderTotal = 0;
        orderList.forEach((item) => {
          if (item.orderId === orderId) {
            orderTotal = item.orderTotal;
          }
        });
        if (orderTotal > 0) {
          res.json({
            status: '0',
            msg: '',
            result: {
              orderId: orderId,
              orderTotal: orderTotal
            }
          })
        }
        else {
          res.json({
            status: '0',
            msg: '',
            result: {
              orderId: orderId,

            }
          })
        }


      }
      else {
        res.json({
          status: '',
          msg: 'not have this order!',
          result: ''
        })
      }
    }
  })
});

module.exports = router;


