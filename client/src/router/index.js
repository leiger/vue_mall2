import Vue from 'vue'
import Router from 'vue-router'

import Index from '../views/Index.vue'
import GoodsList from '../views/GoodsList.vue'
import About from '../views/About.vue'
import Faq from '../views/Faq.vue'
import Contact from '../views/Contact.vue'
import Product from '../views/Product.vue'
import Address from '../views/Address.vue'
import Payment from '../views/Payment.vue';
import OrderSuccess from '../views/OrderSuccess.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: Index,
      name: 'Index'
    },
    {
      path: '/all',
      component: GoodsList
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/faq',
      component: Faq
    },
    {
      path: '/contact',
      component: Contact
    },
    {
      path: '/products/:id',
      component: Product
    },
    {
      path: '/address',
      name: 'Address',
      component: Address,
      meta: {
        login: true
      }
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment,
      meta: {
        login: true
      }
    },
    {
      path: '/orderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess,
      meta: {
        login: true
      }
    }
  ]
})
