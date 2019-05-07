import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginModalState: false,
    // 0->signin, 1->signup
    loginModalType: 0,
    nickName: '',
    drawerState: false,
    cartList: [],
    addressModalState: false,
    addressList: [],
    discount: false
  },
  mutations: {
    updateLoginModal(state, payload) {
      if(payload.type !== undefined) {
        state.loginModalType = payload.type;
      }
      state.loginModalState = payload.action;
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
    },
    // addressModal
    updateAddressModal(state, payload) {
      state.addressModalState = payload;
    },
    updateAddressList(state, payload) {
      state.addressList = payload;
    },
    updateDiscount(state, payload) {
      state.discount = payload;
    }
  }
});
