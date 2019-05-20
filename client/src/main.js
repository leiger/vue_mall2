// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from './vuex'

import iView from 'iview';
import locale from 'iview/dist/locale/en-US';
import './assets/css/index.less';
import 'animate.css/animate.min.css';
import Cookies from 'js-cookie';

// used for mock data
// require('./../mock/mock.js');

Vue.config.productionTip = false;

Vue.use(iView, {
  locale
});

router.beforeEach( async (to, from, next) => {
  // global loading bar
  iView.LoadingBar.start();

  try {
    let id = Cookies.get('id');
    console.log(id);
    if(id || !to.meta.login) {
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
