import { updateCartList, getCartList } from '@/services/cart';

const state = {
  cartList: [],
  drawerState: false
}

const mutations = {
  setDrawerState(state, status) {
    state.drawerState = status;
  },
  setCartList(state, data) {
    state.cartList = [...data.cartList];
  }
}

const actions = {
  async getCartList({ commit }, id) {
    try {
      const { data } = await getCartList(id);
      commit('setCartList', data);
    } catch (err) {
      console.log(err);
    }
  },
  async updateCartList({ dispatch }, { id, productId, changeNum }) {
    try {
      await updateCartList({ id, productId, changeNum });
      await dispatch('getCartList', id);
      return true;
    } catch (err) {
      return false;
    }
  }
}

const getters = {
  totalPrice: state => {
    // console.log(state.cartList);
    return state.cartList.reduce((price, product) => {
      return price + product.newPrice * product.numInCart
    }, 0);
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
