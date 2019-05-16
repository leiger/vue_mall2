const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const _ = require('lodash');
const Joi = require('@hapi/joi');

// get all address from a user
router.get('/:id', async (req, res) => {
  const addressList = await User.findById(req.params.id).select('addressList');

  if (!addressList) return res.status(404).send('The user was not found!');

  res.send(addressList);
});

// get a address
router.get('/:id/:addressId', async (req, res) => {
  const user = await User.findById(req.params.id);
  const address = user.addressList.id(req.params.addressId);
  if (!address) return res.status(404).send('The address with the given ID was not found');

  res.send(address);
});

//add a address
router.post('/:id', async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('The user with the given ID was not found');

  user.addressList.push(req.body);

  await user.save();
  res.send(req.body);
});

// delete a address
router.delete('/:id/:addressId', async (req, res) => {

  const user = await User.findById(req.params.id);
  const address = user.addressList.id(req.params.addressId).remove();
  if (!address) return res.status(404).send('The address with the given ID was not found');

  await user.save();
  res.send(address);
});

function validate(address) {
  const schema = {
    firstname: Joi.string(),
    lastname: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    province: Joi.string().required(),
    postalCode: Joi.string().required()
  };
  return Joi.validate(address, schema);
}



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