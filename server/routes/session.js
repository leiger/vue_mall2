var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Users = require('../models/users');
require('../public/javascripts/date');
const bcrypt = require('bcrypt');





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