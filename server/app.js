let express = require('express');
let winston = require('winston');
let app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

require('./startup/logging')(app);
require('./startup/db')();
require('./startup/routes')(app);
require('./startup/cookie')(app);
require('./startup/validation')();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));