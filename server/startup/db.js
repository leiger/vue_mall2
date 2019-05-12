const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
  mongoose.connect('mongodb://127.0.0.1:27017/vue_mall', {
      useNewUrlParser: true
    })
    .then(() => winston.info("Connected to MongoDB..."));
}