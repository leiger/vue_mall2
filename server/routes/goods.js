let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Goods = require('../models/goods');

// connect mongodb
mongoose.connect('mongodb://127.0.0.1:27017/vue_mall');

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", () => {
  console.log("MongoDB connected error");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected.");
});

router.get("/", (req, res, next) => {
  Goods.find({}, (err, doc) => {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      });
    }
    else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      });
    }
  })
});

module.exports = router;