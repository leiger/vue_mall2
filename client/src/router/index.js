import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '../views/GoodsList.vue'
import Address from '../views/Address.vue'
import OrderConfirm from '../views/orderConfirm.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: GoodsList
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
    }
  ]
})
