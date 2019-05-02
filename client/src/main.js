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

// global loading bar
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: vuex,
  router,
  components: { App },
  template: '<App/>',
});


