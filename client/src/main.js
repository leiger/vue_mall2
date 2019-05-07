// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from './vuex'

import iView from 'iview';
import locale from 'iview/dist/locale/en-US';
import 'iview/dist/styles/iview.css';
import 'animate.css/animate.min.css';
import axios from 'axios';

import infiniteScroll from 'vue-infinite-scroll'

// used for mock data
// require('./../mock/mock.js');

Vue.config.productionTip = false;

Vue.use(iView, {
  locale
});
Vue.use(infiniteScroll);

// global loading bar
router.beforeEach( async (to, from, next) => {
  iView.LoadingBar.start();

  try {
    let { data } = await axios.get("/user/checkLogin");
    if(data.status === '0' || !to.meta.login) {
      next();
    }
    else {
      next({
        name: 'Index',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } catch(err) {
    console.log(err);
  }
});

router.afterEach(route => {
  window.scrollTo(0,0);
  iView.LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: vuex,
  router,
  components: {
    App
  },
  template: '<App/>',
});
