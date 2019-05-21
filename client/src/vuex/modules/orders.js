import { getOrderById, addOrder, modifyOrderState } from '@/services/orders';
import { getInfo } from '@/services/users';

const state = {
  // id, email
  order: {
    _id: ''
  },
  orderList: []
}

const mutations = {
  setCurrentOrder: (state, order) => {
    state.order = { ...order };
  },
  setOrderList: (state, orderList) => {
    state.orderList = [...orderList];
  }
}

const actions = {
  async getOrderList({ commit }, userId) {
    try {
      const { data } = await getInfo(userId);
      commit('setOrderList', data.orderList);
    }
    catch (err) {
      console.log(err);
    }
  },
  async getOrderById({ commit }, orderId) {
    try {
      const { data } = await getOrderById(orderId);
      commit('setCurrentOrder', data);
    }
    catch (err) {
      console.log(err);
    }
  },
  async addOrder({ dispatch }, { userId, totalPrice, addressId }) {
    try {
      const { data } = await addOrder({ userId, total: totalPrice, addressId });
      await dispatch('getOrderById', data._id);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  async modifyOrderState({ dispatch }, { orderId, status }) {
    try {
      const { data } = await modifyOrderState({ orderId, status, date: new Date() });
      await dispatch('getOrderById', data._id);
      return true;
    } catch (err) {
      return false;
    }
  }
}

export default {
  state,
  mutations,
  actions
}
