import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginModalState: false,
    nickName: '',
    drawerState: false,
    cartList: []
  },
  mutations: {
    openLoginModal(state) {
      state.loginModalState = true;
    },
    closeLoginModal(state) {
      state.loginModalState = false;
    },

    updateUserInfo(state, nickName) {
      state.nickName = nickName;
    },

    updateDrawerState(state, drawerState) {
      state.drawerState = drawerState;
    },
    updateCartList(state, cartList) {
      state.cartList = cartList;
    },
    updateCartListOne(state, tem) {
      state.cartList[tem.index].productNum = tem.newValue;
    }
  }
});
