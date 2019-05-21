let express = require('express');
let router = express.Router();
let { Product, validate } = require('../models/product');
let { Category } = require('../models/category');
let Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

// get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// get a product
router.get('/:id', async (req, res) => {
  const { error } = validateId(req.params);
  if (error) return res.status(404).send(error.details[0].message);

  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send('The product with the given ID was not found');

  res.send(product);
});

// new a product
router.post('/', async (req, res) => {
  const { error1 } = validateId(req.params);
  if (error1) return res.status(404).send(error1.details[0].message);

  const { error2 } = validate(req.body);
  if (error2) return res.status(400).send(error2.details[0].message);

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
  const { error1 } = validateId(req.params);
  if (error1) return res.status(404).send(error1.details[0].message);

  const { error2 } = validateUpdateInfo(req.body);
  if (erro2) return res.status(400).send(error2.details[0].message);

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
  const { error } = validateId(req.params);
  if (error) return res.status(404).send(error.details[0].message);

  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product) return res.status(404).send('The product with the given ID was not found');

  res.send(product);
});

function validateId(product) {
  const schema = {
    id: Joi.objectId()
  };
  return Joi.validate(product, schema);
}

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
