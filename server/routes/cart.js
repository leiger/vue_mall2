var express = require('express');
var router = express.Router();

let Goods = require('../models/goods');
let Users = require('../models/users');
let categories = require('../models/categories');

let Response = require('./../public/javascripts/response');

// get cart list
router.get('/cartList', async (req, res) => {
  try {
    let userId = req.cookies.userId;
    let doc = await Users.findOne({
      _id: userId
    });
    if (doc) {
      Response(res, '0', doc.cartList);
    } else {
      Response(res, '3');
    }
  } catch (err) {
    Response(res, '1');
    console.log(err);
  }
});

// add to cart
router.post('/addCart', async (req, res) => {
  try {
    let userId = req.cookies.userId || '';
    let doc = await Users.findOne({
      _id: userId
    });
    let productId = req.body.productId;
    let productNum = req.body.productNum || 1;

    if (doc) {
      let goodsItem = '';
      doc.cartList.forEach(item => {
        if (item.productId === productId) {
          goodsItem = item;
          item.productNum += productNum;
        }
      });

      // exists
      if (goodsItem) {
        try {
          let doc2 = await doc.save();
          if (doc2)
            Response(res, '0');
        } catch (err) {
          Response(res, '1');
          console.log(err);
        }
      } else {
        try {
          let doc1 = await Goods.findOne({
            productId: productId
          });
          if (doc1) {
            doc1.productNum = 1;
            doc.cartList.push(doc1);
            try {
              let doc2 = await doc.save();
              if (doc2) {
                Response(res, '0');
              }
            } catch (err) {
              Response(res, '1');
              console.log(err);
            }
          }
        } catch (err) {
          Response(res, '1');
          console.log(err);
        }
      }
    } else {
      Response(res, '3');
    }
  } catch (err) {
    Response(res, '1');
    console.log(err);
  }
});

// del from cart
router.post('/delCart', (req, res, next) => {
  let userId = req.cookies.userId;
  let productId = req.body.productId;

  Users.update({
    _id: userId
  }, {
    $pull: {
      'cartList': {
        'productId': productId
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
        result: 'suc'
      });
    }
  });
});

module.exports = router;