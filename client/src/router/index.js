import Vue from 'vue'
import Router from 'vue-router'

import Main from '../views/Main.vue';
import Index from '../views/Index.vue';
import Collections from '../views/Collections.vue';
import About from '../views/About.vue';
import Faq from '../views/Faq.vue';
import Contact from '../views/Contact.vue';
import Products from '../views/Products.vue';
import Checkout from '../views/Checkout.vue';
import Payment from '../views/Payment.vue';
import OrderSuccess from '../views/OrderSuccess.vue';
import MyAccount from '../views/MyAccount.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Main,
    children: [
      {
        path: '',
        component: Index,
        name: 'Index',
        meta: {
          index: 0
        }
      },
      {
        path: 'collections',
        component: Collections,
        meta: {
          index: 1
        }
      },
      {
        path: 'about',
        component: About,
        meta: {
          index: 2
        }
      },
      // {
      //   path: 'faq',
      //   component: Faq
      // },
      // {
      //   path: 'contact',
      //   component: Contact
      // },
      {
        path: 'products/:id',
        component: Products,
        meta: {
          index: 3
        }
      },
      {
        path: 'checkout',
        component: Checkout,
        meta: {
          login: true,
          index: 4
        }
      },
      {
        path: 'payment/:id',
        component: Payment,
        meta: {
          login: true,
          index: 5
        }
      },
      {
        path: 'orderSuccess/:id',
        name: 'OrderSuccess',
        component: OrderSuccess,
        meta: {
          login: true,
          index: 6
        }
      }, {
        path: 'myAccount',
        component: MyAccount,
        meta: {
          login: true,
          index: 7
        }
      },
      {
        path: '/404',
        component: NotFound,
        meta: {
          index: 8
        }
      },
      {
        path: '*',
        component: NotFound,
        meta: {
          index: 8
        }
      }
    ]
  }],
  mode: 'history'
})
