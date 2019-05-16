import { login, signUp, logOut } from '@/services/users';

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
  setUser: (state, { id, email }) => {
    state.userInfo.id = id;
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
      commit('setUser', { id: '', email: '' });
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
