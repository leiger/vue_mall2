const morgan = require('morgan');
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function (app) {
  app.use(morgan('dev'));

  winston.handleExceptions(
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true
    }),
    new winston.transports.File({
      filename: 'uncaughtExceptions.log'
    })
  );

  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  winston.add(winston.transports.File, {
    filename: 'logfile.log'
  });
  winston.add(winston.transports.MongoDB, {
    db: 'mongodb://127.0.0.1:27017/vue_mall',
    level: 'info'
  });
}
