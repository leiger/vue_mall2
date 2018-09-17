var express = require('express');
var router = express.Router();

let Users = require('./../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  let param = {
    userName: req.body.username,
    userPwd: req.body.password
  };
  Users.findOne(param, function(err, doc) {
    console.log(doc);
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
        // req.session.user = doc;

        res.json({
          status: '0',
          msg: '',
          result: {
            username: doc.userName
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

module.exports = router;
