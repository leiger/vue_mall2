let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let categoriesSchema = new Schema({
  categoryName: String
});

module.exports = mongoose.model('Category', categoriesSchema);