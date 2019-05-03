import Vue from 'vue'
import Router from 'vue-router'

import Index from '../views/Index.vue'
import GoodsList from '../views/GoodsList.vue'
import About from '../views/About.vue'
import Faq from '../views/Faq.vue'
import Contact from '../views/Contact.vue'
import Address from '../views/Address.vue'
import OrderConfirm from '../views/OrderConfirm.vue'
import OrderSuccess from '../views/OrderSuccess.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: Index
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
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    }
  ]
})
