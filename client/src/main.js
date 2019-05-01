// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from './vuex'

import iView from 'iview';
import 'iview/dist/styles/iview.css';

import infiniteScroll from 'vue-infinite-scroll'

// used for mock data
// require('./../mock/mock.js');

Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(infiniteScroll);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuex,
  router,
  components: { App },
  template: '<App/>',
});


