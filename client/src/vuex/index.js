import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user';
import products from './modules/products';
import cart from './modules/cart';
import addresses from './modules/addresses';
import orders from './modules/orders';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  modules: {
    user,
    products,
    cart,
    addresses,
    orders
  }
});
