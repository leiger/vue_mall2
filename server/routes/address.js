var express = require('express');
var router = express.Router();

let Goods = require('../models/goods');
let Users = require('../models/users');
let categories = require('../models/categories');

let Response = require('./../public/javascripts/response');

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
router.post('/delAddress', async (req, res) => {
  try {
    let userId = req.cookies.userId,
      addressId = req.body.addressId;

    let doc = await Users.update({
      userId: userId
    }, {
      $pull: {
        'addressList': {
          'addressId': addressId
        }
      }
    });
    if (doc) {
      Response(res, '0');
    }
  } catch (err) {
    Response(res, '1');
  }
});

// find addressId and return detail
router.post('/getAddress', async (req, res) => {
  try {
    let userId = req.cookies.userId,
      addressId = req.body.addressId;
    let {
      addressList
    } = await Users.findOne({
      userId: userId
    });
    addressList.forEach((item) => {
      if (item.addressId === addressId) {
        Response(res, '0', result = item);
      }
    });
  } catch (err) {
    Response(res, '1');
  }
});

module.exports = router;