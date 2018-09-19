var express = require('express');
var router = express.Router();

let Users = require('./../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// login
router.post('/login', function(req, res, next) {
  let param = {
    userName: req.body.username,
    userPwd: req.body.password
  };
  Users.findOne(param, function(err, doc) {
    // console.log(doc);
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      });
    }
    else {
      if(doc) {
        // cookie and session
        res.cookie("userId", doc.userId, {
          path: '/',
          maxAge: 1000*60*60
        });
        res.cookie("userName", doc.userName, {
          path: '/',
          maxAge: 1000*60*60
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
router.post('/logout', function(req, res, next) {
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

router.get('/checkLogin', function(req, res, next) {
  if(req.cookies.userId) {
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

router.get('/cartList', function(req, res, next) {
  let userId =  req.cookies.userId;
  Users.findOne({userId: userId}, function (err, doc) {
    if(err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    }
    else {
      if(doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.cartList
        });
      }
    }
  })
});

module.exports = router;


