const productsRouter = require('../routes/products');
const ordersRouter = require('../routes/orders');
const addressesRouter = require('../routes/addresses');
const collectionsRouter = require('../routes/categories');
const usersRouter = require('../routes/users');
const cartsRouter = require('../routes/carts');
const authRouter = require('../routes/auth');
const adminsRouter = require('../routes/admins');
const imagesRouter = require('../routes/images');
const error = require('../middleware/error');

module.exports = function (app) {
  app.use('/api/admins', adminsRouter);
  app.use('/api/addresses', addressesRouter);
  app.use('/api/categories', collectionsRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/carts', cartsRouter);
  app.use('/api/products', productsRouter);
  app.use('/api/orders', ordersRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/images', imagesRouter);

  app.use(error);
}