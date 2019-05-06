let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Goods = require('../models/goods');
let Users = require('../models/users');
let categories = require('../models/categories');

let Response = require('./../public/javascripts/response');

// connect mongodb
mongoose.connect('mongodb://127.0.0.1:27017/vue_mall', {
  useNewUrlParser: true
});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("MongoDB connected success.");
});

// find one goods
router.get("/product", async (req, res) => {
  try {
    let productId = req.query.productId;

    let doc = await Goods.findOne({
      productId
    }).populate('categoryId').exec();
    if (doc) {
      Response(res, '0', result = {
        productDetail: doc
      });
    }
  } catch (err) {
    Response(res, '1');
  }
});

// search goods data
router.get("/list", async (req, res) => {
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  let sortFlag = parseInt(req.query.sortFlag);
  let sortWay = parseInt(req.query.sortWay);

  let priceLevel = req.query.priceLevel;
  let priceGt = '',
    priceLte = '';
  let params = {};
  // 0 means all
  if (priceLevel !== '0') {
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

  try {
    let skip = (page - 1) * pageSize;
    let doc1 = await Goods.find(params).skip(skip).limit(pageSize);
    // sort by price
    if (sortWay === 1) {
      doc1.sort((a, b) => {
        let temp = a.salePrice - b.salePrice;
        return sortFlag === 1 ? temp : -temp;
      });
    }

    if (doc1) {
      Response(res, '0', result = {
        count: doc1.length,
        list: doc1
      });
    }
  } catch (err) {
    console.log(err);
    Response(res, '1');
  }

});

module.exports = router;