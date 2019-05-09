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
          path: 'payment',
          component: Payment,
          meta: {
            login: true,
            index: 5
          }
        },
        {
          path: 'orderSuccess',
          name: 'OrderSuccess',
          component: OrderSuccess,
          meta: {
            login: true,
            index: 6
          }
        }
      ]
    },
  ],
  mode: 'history'
})
