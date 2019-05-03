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
    updateLoginModal(state, payload) {
      state.loginModalState = payload;
    },

    updateUserInfo(state, nickName) {
      state.nickName = nickName;
      if(nickName === "") {
        state.cartList = [];
      }
    },
    // drawer
    updateDrawerState(state, drawerState) {
      state.drawerState = drawerState;
    },
    // cartlist
    updateCartList(state, cartList) {
      state.cartList = cartList;
    },
    updateCartListOne(state, tem) {
      state.cartList[tem.index].productNum = tem.newValue;
    }
  }
});
