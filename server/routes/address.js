var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Products = require('../models/product');
let Users = require('../models/user');

router.post('/add', async (req, res) => {
  try {
    let userId = req.cookies.userId;
    if (userId) {
      let doc = await Users.findOne({
        _id: mongoose.Types.ObjectId(userId)
      });
      if (doc) {
        let {
          firstName,
          lastName,
          address,
          city,
          province,
          postalCode,
          _default
        } = req.body;
        let insertData = {
          _id: mongoose.Types.ObjectId(),
          firstName,
          lastName,
          address,
          city,
          province,
          postalCode,
          _default
        };
        doc.addressList.push(insertData);
        console.log(doc);
        try {
          let doc1 = await doc.save();
          if (doc1) {
            Response(res, '0');
          }
        } catch (err) {
          Response(res, '1');
          console.log(err);
        }
      }
    } else {
      // not login
      Response(res, '3');
    }
  } catch (err) {
    console.log(err);
    Response(res, '1');
  }
});

router.get('/addressList', async (req, res) => {
  try {
    let userId = req.cookies.userId;
    if (userId) {
      let doc = await Users.findOne({
        _id: userId
      });
      doc ? Response(res, '0', doc.addressList) : Response(res, '11');
    } else {
      // not login
      Response(res, '3');
    }
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
      _id = req.body._id;

    let doc = await Users.update({
      _id: userId
    }, {
      $pull: {
        addressList: {
          _id
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