let express = require('express');
let router = express.Router();
let { validate, Category, validateId } = require('../models/category');

// return all names of categories
router.get('/', async (req, res) => {
  const categories = await Category.find().select('name');
  res.send(categories);
});

// get all products under that category
router.get('/:id', async (req, res) => {
  const { error } = validateId(req.params);
  if (error) return res.status(404).send(error.details[0].message);

  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send('The category with the given ID was not found');

  res.send(category);
});


// add a new category
router.post('/', async (req, res) => {
  const { error1 } = validateId(req.params);
  if (error1) return res.status(404).send(error1.details[0].message);

  const { error2 } = validate(req.body);
  if (error2) return res.status(400).send(error2.details[0].message);

  let category = new Category({
    name: req.body.name
  });
  category = await category.save();
  res.send(category);
});

// modify a product name in a category
router.put('/:id', async (req, res) => {
  const { error1 } = validateId(req.params);
  if (error1) return res.status(404).send(error1.details[0].message);

  const { error2 } = validate(req.body);
  if (error2) return res.status(400).send(error2.details[0].message);

  const category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  if (!category) return res.status(404).send('The category with the given ID was not found');

  res.send(category);
});

// delete a category
router.delete('/:id', async (req, res) => {
  const { error } = validateId(req.params);
  if (error) return res.status(404).send(error.details[0].message);

  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category) return res.status(404).send('The category with the given ID was not found');

  res.send(category);
});

module.exports = router;