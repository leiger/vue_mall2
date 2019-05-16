let express = require('express');
let router = express.Router();
let multer = require('multer');
let path = require('path');
let fs = require('fs');

let upload = multer({
  dest: "public/images/products/"
})

// add a new image
router.post('/', upload.single("file"), async (req, res) => {
  res.send(req.file.filename);
});

module.exports = router;