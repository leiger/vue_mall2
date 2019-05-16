import { getOrderById, addOrder, modifyOrderState } from '@/services/orders';

const state = {
  // id, email
  order: {
    _id: ''
  },
}

const mutations = {
  setCurrentOrder: (state, order) => {
    console.log(order);
    state.order = { ...order };
  }
}

const actions = {
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
      const { data } = await modifyOrderState({ orderId, status });
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
