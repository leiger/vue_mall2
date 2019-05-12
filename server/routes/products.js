let express = require('express');
let router = express.Router();
let {
  Product,
  validate
} = require('../models/product');
let {
  Category
} = require('../models/category');
let Joi = require('@hapi/joi');


// get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// get a product
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).send('The product with the given ID was not found');

  res.send(product);
});

// new a product
router.post('/', async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send('Invalid Category');

  const product = new Product({
    name: req.body.name,
    category: {
      _id: category._id,
      name: category.name
    },
    oldPrice: req.body.oldPrice || 0,
    newPrice: req.body.newPrice,
    promote: req.body.promote || false,
    images: req.body.images || [],
    numInStock: req.body.numInStock,
    desc: req.body.desc || []
  });
  await product.save();

  res.send(product);
});

// update a product
router.put('/:id', async (req, res) => {
  const {
    error
  } = validateUpdateInfo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = await Product.updateOne({
    _id: req.params.id
  }, {
    $set: req.body
  });
  if (!product) return res.status(404).send('The product with the given ID was not found');

  // return num of modified ...
  res.send(product);
});

// delete a product
router.delete('/:id', async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product) return res.status(404).send('The product with the given ID was not found');

  res.send(product);
});

function validateUpdateInfo(product) {
  const schema = {
    name: Joi.string().min(2).max(50),
    categoryId: Joi.objectId(),
    oldPrice: Joi.number().min(0).max(10000),
    newPrice: Joi.number().min(0).max(10000),
    promote: Joi.boolean(),
    images: Joi.array(),
    numInStock: Joi.number().min(0).max(1000),
    desc: Joi.array()
  };
  return Joi.validate(product, schema);
}

module.exports = router;





















// find one goods
router.get("/product", async (req, res) => {
  try {
    let productId = req.query.productId;

    let doc = await Products.findOne({
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
    let doc1 = await Products.find(params).skip(skip).limit(pageSize);
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