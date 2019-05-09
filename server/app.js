var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require('cookie-session');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var goodRouter = require('./routes/good');
var orderRouter = require('./routes/order');
var cartRouter = require('./routes/cart');
var addressRouter = require('./routes/address');

let Response = require('./public/javascripts/response');
let mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

//
// connect mongodb
mongoose.connect('mongodb://127.0.0.1:27017/vue_mall', {
  useNewUrlParser: true
});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("MongoDB connected success.");
});

//
// session
app.use(cookieParser('user'));
app.use(session({
  keys: ['key1', 'key2'],
  name: 'user',
  resave: true,
  saveUninitialized: true,
  maxAge: 24 * 60 * 60
}))

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