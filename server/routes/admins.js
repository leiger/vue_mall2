const express = require('express');
const router = express.Router();
const {
  Admin,
  validate
} = require('../models/admin');
const bcrypt = require('bcrypt');

// auth admin
router.get('/', async (req, res) => {
  res.send({
    _id: '5cd9f570356f970464e3764d',
    name: 'leiger',
    email: 'leiger2017@outlook.com',
    avatar: '../assets/avatar.png',
    title: 'system manager'
  });

});

// login
router.post('/', async (req, res) => {
  // const {
  //   error
  // } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // let admin = await Admin.findOne({
  //   email: req.body.email
  // });
  // if (!admin) return res.status(400).send('Invalid email or password!');

  // const validPassword = await bcrypt.compare(req.body.password, admin.password);
  // if (!validPassword) return res.status(400).send('Invalid email or password!');

  // set cookies
  // res.cookie("id", admin._id);
  // res.cookie("email", admin.email);
  // res.send('success');
  res.send({
    status: 'ok',
    currentAuthority: 'admin',
  });
});

// logout
router.delete('/admin', (req, res) => {
  res.clearCookie('id');
  res.clearCookie('email');
});

module.exports = router;