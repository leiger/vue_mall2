import { login, signUp, logOut, checkState } from '@/services/users';

const state = {
  // id, email
  userInfo: {
    id: '',
    email: ''
  },
  loginState: false,
  modal: {
    // 0: login modal; 1: sign up modal
    type: 0,
    open: false
  }
}

const mutations = {
  setUser: (state, { _id, email }) => {
    state.userInfo.id = _id;
    state.userInfo.email = email;
  },
  setLoginState: (state, loginState) => {
    state.loginState = loginState
  },
  setModal: (state, { type, open }) => {
    state.modal.type = type;
    state.modal.open = open;
  }
}

const actions = {
  // check state
  async checkState({ commit }) {
    try {
      const { data } = await checkState();
      if (!data) return false;
      commit('setUser', data);
      return true;
    } catch (err) {
      return false;
    }
  },
  // user login
  async handleLogin({ commit }, { email, password }) {
    try {
      const { data } = await login({ email: email.trim(), password });
      commit('setUser', data);
      commit('setLoginState', true);
      commit('setModal', { type: 0, open: false });
      return true;
    } catch (err) {
      return false;
    }
  },
  async handleSignUp({ commit }, { email, password, rePassword }) {
    try {
      await signUp({ email: email.trim(), password, rePassword });
      commit('setModal', { type: 0, open: true });
      return true;
    } catch (err) {
      return false;
    }
  },
  async handleLogOut({ commit }) {
    try {
      await logOut();
      commit('setUser', { _id: '', email: '' });
      commit('setLoginState', false);
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
