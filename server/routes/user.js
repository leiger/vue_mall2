var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Users = require('../models/users');
require('../public/javascripts/date');
const bcrypt = require('bcrypt');

let Response = require('./../public/javascripts/response');

//signup
router.post('/signup', async (req, res) => {

  let userName = req.body.username,
    userPwd = req.body.password,
    userPwdConfirm = req.body.rePassword;

  if (userPwd === userPwdConfirm) {
    try {
      let doc = await Users.findOne({
        userName
      });
      // user exist
      if (doc) {
        Response(res, '7');
      } else {
        // hash password
        let userPwdHash = await bcrypt.hash(userPwd, 10);
        if (userPwdHash) {
          let ObjectId = mongoose.Types.ObjectId();
          let insertData = new Users({
            _id: ObjectId,
            userName,
            userPwd: userPwdHash,
            orderList: [],
            cartList: [],
            addressList: []
          });
          let doc1 = await insertData.save();
          if (doc1) {
            // success
            Response(res, '0');
          } else {
            Response(res, '10');
          }
        } else {
          Response(res, '9');
        }
      }
    } catch (err) {
      Response(res, '1');
      console.log(err);
    }
  } else {
    Response(res, '8');
  }
});

// login
router.post('/login', async (req, res) => {
  let param = {
    userName: req.body.username
  };
  try {
    let doc = await Users.findOne(param);

    if (doc) {
      // check password
      let result = await bcrypt.compare(req.body.password, doc.userPwd);

      if (result) {
        req.session.user = {
          id: doc._id,
          name: doc.userName
        }
        Response(res, '0', {
          userName: doc.userName
        });
      } else {
        Response(res, '3');
      }
    } else {
      // Wrong Username or Password!
      Response(res, '2');
    }
  } catch (err) {
    Response(res, '1');
  }
});

// logout
router.post('/logout', (req, res) => {
  res.clearCookie('userId');
  res.clearCookie('userName');
  Response(res, '0');
});

// check wheather the user is login in
router.get('/checkLogin', (req, res) => {
  try {
    if (req.session.user) {
      Response(res, '0');
    } else {
      Response(res, '3');
    }
  } catch (err) {
    Response(res, '1');
  }
});

module.exports = router;