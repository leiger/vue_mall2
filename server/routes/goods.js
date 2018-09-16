let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Goods = require('../models/goods');

// connect mongodb
mongoose.connect('mongodb://127.0.0.1:27017/vue_mall', {useNewUrlParser: true});

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
  let page = parseInt(req.param('page'));
  let pageSize = parseInt(req.param('pageSize'));
  let sortFlag = parseInt(req.param('sortFlag'));
  let sortWay = parseInt(req.param('sortWay'));

  let priceLevel = req.param('priceLevel');
  let priceGt = '', priceLte = '';
  let params = {};
  // 0 means all
  if(priceLevel != 0) {
    switch (priceLevel) {
      case '1':
        priceGt = 0;
        priceLte = 100;
        break;
      case '2':
        priceGt = 100;
        priceLte = 500;
        break;
      case '3':
        priceGt = 500;
        priceLte = 1000;
        break;
      case '4':
        priceGt = 1000;
        priceLte = 5000;
        break;
    }
    params = {
      salePrice: {
        $gt: priceGt,
        $lte: priceLte
      }
    }
  }

  let skip = (page-1) * pageSize;
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);

  // sort by price
  if(sortWay === 1) {
    goodsModel.sort({'salePrice': sortFlag});
  }

  goodsModel.exec((err, doc) => {
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