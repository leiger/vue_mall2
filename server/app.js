var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var goodRouter = require('./routes/good');
var orderRouter = require('./routes/order');
var cartRouter = require('./routes/cart');
var addressRouter = require('./routes/address');
var paymentRouter = require('./routes/payment');

let Response = require('./public/javascripts/response');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  if (req.cookies.userId) {
    next();
  } else {
    let legalUrl = [
      '/user/login',
      '/user/logout',
      '/good/list',
      '/good/product',
      '/user/signup'
    ]
    if (legalUrl.indexOf(req.originalUrl) !== -1 || legalUrl.indexOf(req.path) !== -1) {
      next();
    } else {
      Response(res, '3');
    }
  }
});

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/good', goodRouter);
app.use('/order', orderRouter);
app.use('/cart', cartRouter);
app.use('/address', addressRouter);
app.use('/payment', paymentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;